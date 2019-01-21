import { join } from 'path';

export const BASE = process.cwd();
export const DEFAULT_PORT = 3000;
// eslint-disable-next-line no-process-env
export const PORT = process.env.PORT || DEFAULT_PORT;

export const OUTPUT = join( BASE, 'site', 'static', 'assets' );
