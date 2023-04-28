import 'module-alias/register';
import container from './container';
import './scheduler-worker/main';
export const app: any = container.resolve('app');

// Start the server
app.start().catch((error: { stack: any }) => {
  app.logger.error(error.stack);
  process.exit();
});
