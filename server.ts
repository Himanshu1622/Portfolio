import http from "http";
import fs from "fs";
import path from "path";
import url from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function getMime(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html": return "text/html";
    case ".js": return "text/javascript";
    case ".css": return "text/css";
    case ".json": return "application/json";
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".svg": return "image/svg+xml";
    default: return "application/octet-stream";
  }
}

async function startServer() {
  const PORT = 3000;
  const isDev = process.env.NODE_ENV !== "production";
  let vite: any = null;

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
  }

  const server = http.createServer(async (req, res) => {
    try {
      const parsed = url.parse(req.url || "", true);
      const pathname = parsed.pathname || "/";

      if (pathname === "/api/contact" && req.method === "POST") {
        let body = "";
        for await (const chunk of req) body += chunk;
        let data: any;
        try { data = JSON.parse(body); } catch (e) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid JSON" }));
          return;
        }

        const { name, email, message } = data;
        if (!name || !email || !message) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "All fields are required" }));
          return;
        }

        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
            port: parseInt(process.env.SMTP_PORT || "2525"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.SMTP_USER || "e6b09d697f39fb",
              pass: process.env.SMTP_PASS || "2ba213f7b9dadf",
            },
          });

          const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: "himanshu.vrma16@gmail.com",
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            `,
          };

          await transporter.sendMail(mailOptions);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true, message: "Email sent successfully" }));
        } catch (error) {
          console.error("Error sending email:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Failed to send email" }));
        }
        return;
      }

      if (isDev && vite) {
        return vite.middlewares(req, res, (err: any) => {
          if (err) {
            res.statusCode = 500;
            res.end(err.stack || err.message);
          }
        });
      }

      // Production static file serving
      const distPath = path.resolve("dist");
      let filePath = path.join(distPath, pathname.replace(/\/+/, "/"));
      if (filePath.endsWith("/")) filePath = path.join(filePath, "index.html");
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distPath, "index.html");
      }

      const stream = fs.createReadStream(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", getMime(filePath));
      stream.pipe(res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
