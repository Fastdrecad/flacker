interface Environment {
  apiUrl: string;
  socketUrl: string;
}

const environments: Record<string, Environment> = {
  development: {
    apiUrl: "http://localhost:5000/api",
    socketUrl: "ws://localhost:5000"
  },
  production: {
    apiUrl: "https://api.flacker.andrijadesign.com/api",
    socketUrl: "wss://api.flacker.andrijadesign.com"
  }
};

const environment = import.meta.env.MODE || "development";
export const config = environments[environment];
