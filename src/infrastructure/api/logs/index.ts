import { DISABLE_LOGS } from '@/infrastructure/api/config/envs';
import { asyncLocalStorage } from '../container/globalState';

export const getActualMoment = (): string => {
  const date = new Date();

  return `${date.toISOString()}`;
};

export const getTraceId = () => {
  const storeData = asyncLocalStorage.getStore();

  if (!storeData || !storeData.traceId) {
    return '';
  }

  return `${String(storeData.traceId).padEnd(20).padStart(25)}`;
};

export const getUserId = () => {
  const oldStore = asyncLocalStorage.getStore();

  if (!oldStore || !oldStore.userId) {
    return;
  }
  return oldStore.userId;
};

export type levelsType = 'ERROR' | 'INFO' | 'WARN' | 'DEBUG';

export const formatStartMessage = (level: string) => {
  return `${getActualMoment()} ` + `[${level}]`.padEnd(8, ' ');
};

export class Log {
  public static info(message: unknown, ...extras: unknown[]): void {
    this.showLogs('info', message, extras);
  }

  public static error(message: unknown, ...extras: unknown[]): void {
    this.showLogs('error', message, extras);
  }

  public static debug(message: unknown, ...extras: unknown[]): void {
    this.showLogs('debug', message, extras);
  }

  public static warning(message: unknown, ...extras: unknown[]): void {
    this.showLogs('warn', message, extras);
  }

  private static showLogs(level: 'warn' | 'debug' | 'error' | 'info', message: unknown, extras: unknown[]) {
    if (DISABLE_LOGS) {
      return;
    }

    const traceId = getTraceId();
    const userId = getUserId();

    console[level](
      formatStartMessage(level.toUpperCase()),
      message,
      ...extras,
      userId ? `| userId: ${userId}` : '',
      traceId ? `| TraceId: ${traceId}` : '',
    );
  }
}
