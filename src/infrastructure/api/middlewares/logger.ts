import { DISABLE_LOGS } from '@/config/envs';
import { applyColors, colors, getContext, levelsType } from '@/logs/index';
import morgan from 'morgan';

export const useLogger = morgan((tokens, req, res) => {
  if (DISABLE_LOGS) {
    return undefined;
  }

  const status = tokens.status(req, res);
  const mapColors: { [key: string]: string } = {
    '0': colors.DEBUG,
    '2': colors.INFO,
    '3': colors.INFO,
    '4': colors.ERROR,
    '4 ': colors.WARN,
    '5': colors.ERROR,
  };

  const mapText: { [key: string]: levelsType } = {
    '0': 'DEBUG',
    '2': 'INFO',
    '3': 'INFO',
    '4': 'ERROR',
    '4 ': 'WARN',
    '5': 'ERROR',
  };

  return [
    applyColors(mapText[String(status)[0]], mapColors[String(status)[0]]),
    getContext(),
    tokens.method(req, res),
    tokens.url(req, res),
    status,
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
});
