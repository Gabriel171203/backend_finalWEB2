import { Injectable } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard {
  // Kita bisa menambahkan metode atau logika tambahan khusus untuk JWT di sini jika diperlukan
}
