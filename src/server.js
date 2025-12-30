import app from "./app.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT || 5021;

async function startServer() {
  if (ENV.NODE_ENV === "dev") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  } else if (ENV.NODE_ENV === "prod" || ENV.NODE_ENV === "local") {
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT} 🚀`)
    );
  }
}

startServer();
