import { connectDatabase } from "./config/db";
import { ProductModel } from "./models/Product";
import { UserModel } from "./models/User";

const seed = async (): Promise<void> => {
  await connectDatabase();

  const users = [
    { email: "admin@demo.com", password: "Admin123!", name: "Admin Demo", role: "ADMIN", active: true },
    { email: "gerencia@store.com", password: "Admin123!", name: "Gerencia Principal", role: "ADMIN", active: true },
    { email: "user@demo.com", password: "User123!", name: "User Demo", role: "USER", active: true },
    { email: "ana@store.com", password: "User123!", name: "Ana Torres", role: "USER", active: true },
    { email: "carlos@store.com", password: "User123!", name: "Carlos Mejia", role: "USER", active: false },
    { email: "maria@store.com", password: "User123!", name: "Maria Gomez", role: "USER", active: true },
    { email: "javier@store.com", password: "User123!", name: "Javier Rios", role: "USER", active: true },
    { email: "soporte@store.com", password: "Admin123!", name: "Soporte TI", role: "ADMIN", active: true },
  ];

  const products = [
    {
      title: "Laptop Pro 14",
      description: "Laptop de alto rendimiento para trabajo y analitica.",
      price: 1599.99,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/laptop-pro-14/400/300"],
      stock: 18,
      active: true,
    },
    {
      title: "Monitor 27 QHD",
      description: "Monitor de 27 pulgadas con resolucion QHD.",
      price: 329.5,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/monitor-27-qhd/400/300"],
      stock: 36,
      active: true,
    },
    {
      title: "Teclado Mecanico",
      description: "Teclado mecanico con switches tactiles y retroiluminacion.",
      price: 89.9,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/teclado-mecanico/400/300"],
      stock: 72,
      active: true,
    },
    {
      title: "Mouse Inalambrico",
      description: "Mouse ergonomico inalambrico con bateria recargable.",
      price: 39.9,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/mouse-inalambrico/400/300"],
      stock: 95,
      active: true,
    },
    {
      title: "Silla Ergonomica",
      description: "Silla de oficina con soporte lumbar ajustable.",
      price: 249.0,
      category: "Oficina",
      images: ["https://picsum.photos/seed/silla-ergonomica/400/300"],
      stock: 22,
      active: true,
    },
    {
      title: "Escritorio Ajustable",
      description: "Escritorio elevable electrico para trabajo de pie.",
      price: 419.0,
      category: "Oficina",
      images: ["https://picsum.photos/seed/escritorio-ajustable/400/300"],
      stock: 14,
      active: true,
    },
    {
      title: "Lampara LED de Escritorio",
      description: "Lampara LED regulable con tres temperaturas de color.",
      price: 34.75,
      category: "Oficina",
      images: ["https://picsum.photos/seed/lampara-led/400/300"],
      stock: 60,
      active: true,
    },
    {
      title: "Cuaderno Ejecutivo",
      description: "Cuaderno de tapa dura para notas de reuniones.",
      price: 12.5,
      category: "Papeleria",
      images: ["https://picsum.photos/seed/cuaderno-ejecutivo/400/300"],
      stock: 180,
      active: true,
    },
    {
      title: "Paquete de Boligrafos",
      description: "Set de 10 boligrafos de tinta azul.",
      price: 7.9,
      category: "Papeleria",
      images: ["https://picsum.photos/seed/boligrafos-pack/400/300"],
      stock: 260,
      active: true,
    },
    {
      title: "Archivador Metalico",
      description: "Archivador de metal con 3 gavetas.",
      price: 189.0,
      category: "Oficina",
      images: ["https://picsum.photos/seed/archivador-metalico/400/300"],
      stock: 11,
      active: true,
    },
    {
      title: "Botella Termica",
      description: "Botella termica de acero inoxidable de 750 ml.",
      price: 21.4,
      category: "Accesorios",
      images: ["https://picsum.photos/seed/botella-termica/400/300"],
      stock: 88,
      active: true,
    },
    {
      title: "Mochila Urbana",
      description: "Mochila resistente al agua con compartimento para laptop.",
      price: 54.9,
      category: "Accesorios",
      images: ["https://picsum.photos/seed/mochila-urbana/400/300"],
      stock: 47,
      active: true,
    },
    {
      title: "Audifonos Bluetooth",
      description: "Audifonos over-ear con cancelacion de ruido.",
      price: 129.9,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/audifonos-bt/400/300"],
      stock: 39,
      active: true,
    },
    {
      title: "Webcam Full HD",
      description: "Webcam Full HD ideal para videollamadas.",
      price: 68.3,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/webcam-fhd/400/300"],
      stock: 41,
      active: true,
    },
    {
      title: "Microfono USB",
      description: "Microfono condensador USB para streaming y reuniones.",
      price: 97.2,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/microfono-usb/400/300"],
      stock: 27,
      active: true,
    },
    {
      title: "Disco SSD 1TB",
      description: "Unidad de estado solido NVMe de 1TB.",
      price: 112.0,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/ssd-1tb/400/300"],
      stock: 53,
      active: true,
    },
    {
      title: "Hub USB-C 7 en 1",
      description: "Adaptador multipuerto USB-C con HDMI y lector SD.",
      price: 45.0,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/hub-usbc/400/300"],
      stock: 76,
      active: true,
    },
    {
      title: "Pizarra Magnetica",
      description: "Pizarra blanca magnetica para sala de reuniones.",
      price: 72.6,
      category: "Oficina",
      images: ["https://picsum.photos/seed/pizarra-magnetica/400/300"],
      stock: 19,
      active: true,
    },
    {
      title: "Resma Papel Carta",
      description: "Resma de 500 hojas tamano carta.",
      price: 9.4,
      category: "Papeleria",
      images: ["https://picsum.photos/seed/resma-carta/400/300"],
      stock: 310,
      active: true,
    },
    {
      title: "Calculadora Cientifica",
      description: "Calculadora cientifica con funciones avanzadas.",
      price: 26.8,
      category: "Papeleria",
      images: ["https://picsum.photos/seed/calculadora-cientifica/400/300"],
      stock: 54,
      active: true,
    },
    {
      title: "Cargador USB-C 65W",
      description: "Cargador de pared USB-C con tecnologia GaN.",
      price: 38.9,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/cargador-65w/400/300"],
      stock: 84,
      active: true,
    },
    {
      title: "Regleta 6 Tomas",
      description: "Regleta con proteccion contra sobrecargas.",
      price: 17.7,
      category: "Accesorios",
      images: ["https://picsum.photos/seed/regleta-6/400/300"],
      stock: 93,
      active: true,
    },
    {
      title: "Camara de Seguridad WiFi",
      description: "Camara IP interior con vision nocturna.",
      price: 74.99,
      category: "Tecnologia",
      images: ["https://picsum.photos/seed/camara-wifi/400/300"],
      stock: 33,
      active: true,
    },
    {
      title: "Kit Limpieza Pantallas",
      description: "Kit de limpieza para monitores y laptops.",
      price: 14.3,
      category: "Accesorios",
      images: ["https://picsum.photos/seed/kit-limpieza/400/300"],
      stock: 120,
      active: true,
    },
    {
      title: "Organizador de Cables",
      description: "Set de organizadores adhesivos para cables.",
      price: 8.6,
      category: "Accesorios",
      images: ["https://picsum.photos/seed/organizador-cables/400/300"],
      stock: 210,
      active: true,
    },
  ];

  let createdUsers = 0;
  let createdProducts = 0;

  for (const item of users) {
    const exists = await UserModel.findOne({ email: item.email });
    if (!exists) {
      await UserModel.create(item);
      createdUsers += 1;
    }
  }

  for (const item of products) {
    const exists = await ProductModel.findOne({ title: item.title, category: item.category });
    if (!exists) {
      await ProductModel.create(item);
      createdProducts += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Seed completed. Users created: ${createdUsers}. Products created: ${createdProducts}`);
  process.exit(0);
};

void seed();
