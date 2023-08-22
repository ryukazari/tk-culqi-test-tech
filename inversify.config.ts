import "reflect-metadata";
import { Container } from "inversify";
import { UserService } from "./src/application/user.service";
import { CardService } from "./src/application/card.service";
import { UserRedisRepository } from "./src/infrastructure/persistence/user.redis.repository";
import { CardRedisRepository } from "./src/infrastructure/persistence/card.redis.repository";

const container: Container = new Container();

container.bind<UserService>(UserService).to(UserService);
container.bind<CardService>(CardService).to(CardService);
container.bind<UserRedisRepository>("USER_REPOSITORY").to(UserRedisRepository);
container.bind<CardRedisRepository>("CARD_REPOSITORY").to(CardRedisRepository);

export default container;
