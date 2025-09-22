export const RUN = import.meta.env.PUBLIC_RUN_HOST;

export const cid = () =>
  localStorage.cid || (localStorage.cid = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2)));

export const fire = (type, payload = {}) =>
  fetch(`${RUN}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ click_id: cid(), payload: { type, ts: Date.now(), ...payload } })
  }).catch(() => {
    new Image().src = `${RUN}/api/events?payload=%7B%22type%22%3A%22${encodeURIComponent(type)}%22%7D`;
  });
