import messages from './messages.json';

const readMessage = (keyString: string) => {
  const keys = keyString.split('.').slice(1);
  let value = null;

  for (let i = 0; i < keys.length; i++) {
    value = value
      ? value[keys[i].toLowerCase()] || value
      // @ts-ignore
      : messages[keys[i].toLowerCase()];
  }

  return value;
};

export default readMessage;
