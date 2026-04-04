module.exports = {
  apps: [
    {
      name: "easysite-bot",
      script: "uvicorn",
      args: "main:app --host 0.0.0.0 --port 5000",
      cwd: "/root/easysite-bot",
      interpreter: "none",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        PYTHONUNBUFFERED: "1",
      },
    },
  ],
};
