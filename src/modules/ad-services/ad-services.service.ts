import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalServiceEntity } from '../../common/entities/additional-service.entity';
import { Repository } from 'typeorm';
import { CreateAdServiceDto } from './dto/create-ad-service.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { SERVER_URL } from '../../../config/common.config';
import { ChangeAdServiceDto } from './dto/change-ad-service.dto';

@Injectable()
export class AdServicesService {
  constructor(
    @InjectRepository(AdditionalServiceEntity) private readonly adServiceRepo: Repository<AdditionalServiceEntity>,
  ) {}

  async getAdServices() {
    return await this.adServiceRepo.find({ relations: ['category'] });
  }

  async createAdService(image: Express.Multer.File, createAdServiceDto: CreateAdServiceDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    createAdServiceDto.is_available = createAdServiceDto.is_available !== 'false';
    const adService = this.adServiceRepo.create({ ...createAdServiceDto, image_url: pathToImage });
    const { id } = await this.adServiceRepo.save(adService);
    return await this.adServiceRepo
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .where('service.id = :serviceId', { serviceId: id })
      .getOne();
  }

  async changeAdService(
    id: string,
    image: Express.Multer.File,
    changeAdServiceDto: ChangeAdServiceDto,
    savedImgFolder: string,
  ) {
    const adService = await this.adServiceRepo.findOne(id);
    if (!adService) throw new HttpException('Сервис с таким ID не существует в базе', HttpStatus.BAD_REQUEST);

    if (image && image.size) {
      adService.image_url = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeAdServiceDto).forEach((key: string) => {
      if (key === 'is_available') changeAdServiceDto.is_available = changeAdServiceDto.is_available !== 'false';
      adService[key] = changeAdServiceDto[key];
    });

    const savedAdService = await this.adServiceRepo.save(adService);
    return await this.adServiceRepo
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.category', 'category')
      .where('service.id = :serviceId', { serviceId: savedAdService.id })
      .getOne();
  }

  async deleteAdService(id: string) {
    await this.adServiceRepo.delete(id);
    return true;
  }
}
