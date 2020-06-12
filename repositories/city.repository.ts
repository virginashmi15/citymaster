import {DefaultCrudRepository} from '@loopback/repository';
import {City, CityRelations} from '../models';
import {CityDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {
  constructor(
    @inject('datasources.city') dataSource: CityDataSource,
  ) {
    super(City, dataSource);
  }
}