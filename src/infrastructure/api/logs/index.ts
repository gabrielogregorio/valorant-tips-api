import { DISABLE_LOGS } from '@/config/envs';
import { asyncLocalStorage } from '../container/globalState';

export const getActualMoment = (): string => {
  const date = new Date();

  return `${date.toLocaleDateString().replace(/\//g, '-')} ${date.toLocaleString('en-US', {
    timeStyle: 'medium',
    hourCycle: 'h24',
  })}`;
};

export const getContext = () => `${getActualMoment()}`;

export const getTraceId = () => {
  const traceId = asyncLocalStorage.getStore();
  if (!traceId) {
    return '';
  }

  return `${String(traceId).padEnd(20).padStart(25)}`;
};

export type levelsType = 'ERROR' | 'INFO' | 'WARN' | 'DEBUG';

export const colors: { [key in levelsType]: string } = {
  INFO: '36',
  ERROR: '31;1',
  WARN: '33',
  DEBUG: '37;1',
};

/* eslint-disable no-console */

export const runningInTerminal = (): boolean => Boolean(process.stdout.isTTY);

export const applyColors = (level: levelsType, color: string): string => {
  if (runningInTerminal()) {
    return `\x1B[${color}m${level}\x1B[0m`.replace(' ', '');
  }
  return level;
};

export class Log {
  private static baseStart(level: levelsType): string {
    return `[${applyColors(level, colors[level])}]`;
  }

  public static info(message: unknown, ...extras: unknown[]): void {
    this.showLogs('info', `${this.baseStart('INFO')}`, message, extras);
  }

  public static error(message: unknown, ...extras: unknown[]): void {
    this.showLogs('error', `${this.baseStart('ERROR')}`, message, extras);
  }

  public static debug(message: unknown, ...extras: unknown[]): void {
    this.showLogs('debug', `${this.baseStart('DEBUG')}`, message, extras);
  }

  public static warning(message: unknown, ...extras: unknown[]): void {
    this.showLogs('warn', `${this.baseStart('WARN')}`, message, extras);
  }

  private static showLogs(
    level: 'warn' | 'debug' | 'error' | 'info',
    color: string,
    message: unknown,
    extras: unknown[],
  ) {
    if (DISABLE_LOGS) {
      return;
    }

    console[level](color, getContext(), message, ...extras, getTraceId());
  }
}
