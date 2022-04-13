import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvertisingBannerEntity } from '../../common/entities/advertising-banner.entity';
import { Repository } from 'typeorm';
import { CreateAdDto } from './dto/create-ad.dto';
import { checkIsFileNotEmpty } from '../../utils/file-upload.utils';
import { ChangeAdDto } from './dto/change-ad.dto';
import { SERVER_URL } from '../../../config/common.config';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(AdvertisingBannerEntity) private readonly adRepo: Repository<AdvertisingBannerEntity>,
  ) {}

  async getAllAds() {
    return await this.adRepo.find();
  }

  async createAd(image: Express.Multer.File, createAdDto: CreateAdDto, savedImgFolder: string) {
    checkIsFileNotEmpty(image);
    const pathToImage = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    const ad = this.adRepo.create({ banner_img: pathToImage, banner_url: createAdDto.banner_url });
    return await this.adRepo.save(ad);
  }

  async changeAd(id: string, image: Express.Multer.File, changeAdDto: ChangeAdDto, savedImgFolder: string) {
    const ad = await this.adRepo.findOne(id);
    if (!ad) {
      throw new HttpException('Рекламный баннер с таким ID не существует в базе', HttpStatus.BAD_REQUEST);
    }

    if (image && image.size) {
      ad.banner_img = `${SERVER_URL}/${savedImgFolder}/${image.filename}`;
    }
    Object.keys(changeAdDto).forEach((key: string) => {
      ad[key] = changeAdDto[key];
    });

    return await this.adRepo.save(ad);
  }

  async deleteAd(id: string) {
    await this.adRepo.delete(id);
    return true;
  }
}
