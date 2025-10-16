import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 💡 Habilitar CORS solo para el front local
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // 📦 Permitir JSONs grandes (por si subes imágenes codificadas o texto extenso)
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // 🖼️ Servir archivos estáticos (las imágenes de las noticias)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // esto hace que /uploads/... sirva desde la carpeta local
  });

  // 🌍 Prefijo global opcional (por si luego quieres agrupar APIs bajo /api)
  // app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}
bootstrap();
