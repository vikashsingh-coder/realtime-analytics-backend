export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECTION: "disconnection",
  PRICE_UPDATE: "price-update",
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
};

export const REDIS_CHANNELS = {
  PRICE_UPDATE: "price-update",
};

export const QUEUE_NAMES = {
  ALERT_QUEUE: "alert-queue",
  EMAIL_QUEUE: "email-queue",
};

export const CACHE_KEYS = {
  TOP_GAINERS: "top-gainers",
  TOP_LOSERS: "top-losers",
};
