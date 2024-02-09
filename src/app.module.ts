import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [CardModule, UserModule, CharacterModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
