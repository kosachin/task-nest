import { DataSource } from 'typeorm';

import { AppDataSource } from '../config/data-source';
import { CatalogueEntity } from '../catologue/entities/catologue.entity';
import { MainCategoryEntity } from '../catologue/entities/main-category.entity';
import { SubCategoryEntity } from '../catologue/entities/sub-category.entity';
import { ServiceTypeEntity } from '../catologue/entities/service-type.entity';
import { ServiceItemEntity } from '../catologue/entities/service-item.entity';

const ELECTRICIAN_DATA = [
  {
    title: 'Home appliances',
    items: [
      {
        title: 'AC',
        categories: {
          Service: [
            {
              name: 'AC General Check-up',
              price: 299,
              description:
                'Comprehensive AC inspection to ensure proper cooling and function.',
            },
          ],
          Packages: [
            {
              name: 'AC Annual Maintenance Plan',
              price: 1499,
              description:
                '3 services/year including filter cleaning, gas check & priority support.',
            },
          ],
          Repair: [
            {
              name: 'AC Gas Leakage Repair',
              price: 899,
              description:
                'Fixing gas leakage with nitrogen pressure test and refill (gas cost extra).',
            },
          ],
          Installation: [
            {
              name: 'Split AC Installation',
              price: 1599,
              description:
                'Includes wall drilling, mounting, copper pipe fitting up to 5 ft.',
            },
          ],
        },
      },
      {
        title: 'Washing Machine',
        categories: {
          Service: [
            {
              name: 'Washing Machine Tune-up',
              price: 249,
              description:
                'Cleaning, checking drum spin, drainage, and filter.',
            },
          ],
          Packages: [
            {
              name: 'Annual Deep Cleaning Package',
              price: 899,
              description:
                '2 services/year with drum descaling & full clean-up.',
            },
          ],
          Repair: [
            {
              name: 'Water Drainage Issue Fix',
              price: 599,
              description: 'Solving drainage or pipe blockage issues.',
            },
          ],
          Installation: [
            {
              name: 'Front-load Installation',
              price: 499,
              description: 'Includes alignment and inlet/outlet pipe setup.',
            },
          ],
        },
      },
      {
        title: 'Television',
        categories: {
          Service: [
            {
              name: 'TV Power & Display Check',
              price: 199,
              description:
                'Complete inspection of power, display, and HDMI ports.',
            },
          ],
          Packages: [],
          Repair: [
            {
              name: 'Screen Flickering Fix',
              price: 899,
              description:
                'Diagnose and fix flickering issues (excluding part cost).',
            },
          ],
          Installation: [
            {
              name: 'Wall Mount Installation',
              price: 399,
              description:
                'Mount your LED/LCD TV on the wall with professional fitting.',
            },
          ],
        },
      },
    ],
  },
  {
    title: 'Kitchen appliances',
    items: [
      {
        title: 'Water Purifier',
        categories: {
          Service: [
            {
              name: 'Filter Cleaning',
              price: 299,
              description: 'Full internal cleaning and filter flushing.',
            },
          ],
          Packages: [
            {
              name: 'Annual RO Service Pack',
              price: 1499,
              description: '3 services/year with filter replacement alerts.',
            },
          ],
          Repair: [
            {
              name: 'Leakage Repair',
              price: 499,
              description: 'Fix leaking joints, connectors or damaged parts.',
            },
          ],
          Installation: [
            {
              name: 'RO Wall Mount Installation',
              price: 599,
              description:
                'Drilling, brackets, pipe connections and TDS check.',
            },
          ],
        },
      },
      {
        title: 'Microwave',
        categories: {
          Service: [
            {
              name: 'Basic Health Check-up',
              price: 199,
              description: 'Power, heating coil, and control panel inspection.',
            },
          ],
          Packages: [],
          Repair: [
            {
              name: 'Microwave Not Heating Repair',
              price: 799,
              description:
                'Fix heating issues including magnetron or fuse replacement.',
            },
          ],
          Installation: [
            {
              name: 'Microwave Countertop Setup',
              price: 249,
              description: 'Power setup, leveling, and operational check.',
            },
          ],
        },
      },
      {
        title: 'Chimney',
        categories: {
          Service: [
            {
              name: 'Deep Cleaning',
              price: 699,
              description:
                'Complete degreasing, mesh/baffle cleaning and odor removal.',
            },
          ],
          Packages: [
            {
              name: 'Chimney AMC (Quarterly)',
              price: 2199,
              description:
                '4 deep cleans/year with filter replacement suggestions.',
            },
          ],
          Repair: [
            {
              name: 'Suction Issue Repair',
              price: 899,
              description:
                'Fan and motor cleaning or replacement if needed (extra).',
            },
          ],
          Installation: [
            {
              name: 'Wall-mounted Chimney Installation',
              price: 999,
              description:
                'Includes duct fitting, drilling and proper vent placement.',
            },
          ],
        },
      },
    ],
  },
];

export async function seedElectricianCatalogue(dataSource: DataSource) {
  const catalogueRepo = dataSource.getRepository(CatalogueEntity);

  const exists = await catalogueRepo.findOne({
    where: { name: 'Electrician' },
  });
  if (exists) {
    console.log('⚠️ Electrician already seeded. Skipping.');
    return;
  }
  const mainCategoryRepo = AppDataSource.getRepository(MainCategoryEntity);
  const subCategoryRepo = AppDataSource.getRepository(SubCategoryEntity);
  const serviceTypeRepo = AppDataSource.getRepository(ServiceTypeEntity);
  const serviceItemRepo = AppDataSource.getRepository(ServiceItemEntity);

  const catalogue = catalogueRepo.create({ name: 'Electrician' });
  await catalogueRepo.save(catalogue);

  const serviceTypeMap: Record<string, ServiceTypeEntity> = {};

  for (const name of ['Service', 'Packages', 'Repair', 'Installation']) {
    const type = serviceTypeRepo.create({ name });
    await serviceTypeRepo.save(type);
    serviceTypeMap[name] = type;
  }

  for (const main of ELECTRICIAN_DATA) {
    const mainCategory = mainCategoryRepo.create({
      name: main.title,
      catalogue,
    });
    await mainCategoryRepo.save(mainCategory);

    for (const sub of main.items) {
      const subCategory = subCategoryRepo.create({
        name: sub.title,
        mainCategory,
      });
      await subCategoryRepo.save(subCategory);

      for (const [typeName, services] of Object.entries(sub.categories)) {
        for (const service of services) {
          const item = serviceItemRepo.create({
            name: service.name,
            description: service.description,
            price: service.price,
            subCategory,
            serviceType: serviceTypeMap[typeName],
            isActive: true,
          });
          await serviceItemRepo.save(item);
        }
      }
    }
  }

  console.log('✅ Seeded electrician catalogue');
}
