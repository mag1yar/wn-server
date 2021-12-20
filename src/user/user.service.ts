import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne(cond);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder('u');
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.login) qb.andWhere(`u.login LIKE :login`);
    if (dto.email) qb.andWhere(`u.email LIKE :email`);

    qb.setParameters({
      login: `%${dto.login}%`,
      email: `%${dto.email}%`,
    });

    const [novels, total] = await qb.getManyAndCount();
    return [novels, total];
  }
}
