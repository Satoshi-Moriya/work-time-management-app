type ConfigType = {
  apiBaseUrl: string;
}

const Config: ConfigType = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || ""
}

export default Config