import { defineContract } from '@prisma/orm-postgres/contract-builder';

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model('User', {
    fields: {
      id: field.id.uuidv7String(),
      email: field.text().unique(),
      username: field.text().optional(),
      name: field.text().optional(),
      password: field.text(), // tarea 1.1: tabla de usuarios
      role: field.text().default('USER'),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const SystemConfig = model('SystemConfig', {
    // tarea 1.2: tablas de configuración del sistema
    fields: {
      key: field.text().unique(),
      value: field.text(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const MigrationTracking = model('MigrationTracking', {
    // tarea 1.5: seguimiento de versiones de migración
    fields: {
      id: field.id.uuidv7String(),
      version: field.text(),
      appliedAt: field.temporal.createdAtString(),
    },
  });

  const Producto = model('Producto', {
    // modelo para productos e-commerce
    fields: {
      id: field.id.uuidv7String(),
      title: field.text(),
      image: field.text(),
      originalPrice: field.int(),
      salePrice: field.int(),
      discount: field.int(),
      whatsappUrl: field.text(),
      createdAt: field.temporal.createdAtString(),
    },
  });

  return {
    models: {
      User: User.relations({
        // relacioens si es necesario
      }),
      SystemConfig,
      MigrationTracking,
      Producto,
    },
  };
});
