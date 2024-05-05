export default function track(...args) {
  if (process.env.NODE_ENV === 'production') {
    mixpanel.track(...args);
  }
}
