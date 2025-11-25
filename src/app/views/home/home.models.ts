export interface ITopic {
  id: string;
  title: string;
  subtitle?: string;
  subItems?: string[];
  completed?: boolean;
}

export const COURSE_TOPICS: Array<ITopic> = [
  {
    id: '1',
    title: 'Patrones de diseño',
    subItems: [
      'Modelo Vista Controlador (Model View Controller)',
      'Modelo contenedor (Container model)',
    ],
    completed: false,
  },
  {
    id: '2',
    title: 'Lazy loading',
    completed: false,
  },
  {
    id: '3',
    title: 'Pipes',
    completed: false,
  },
  {
    id: '4',
    title: 'Optimización de desarrollo componentes',
    subtitle:
      'Flujo de información entre padres-hijos sin llegar al prop drilling',
    completed: false,
  },
  {
    id: '5',
    title: 'Gestores de estado global',
    subtitle: 'Como nanostores o zustand y su integración con Angular',
    completed: false,
  },
  {
    id: '6',
    title: 'Reactividad RXJS',
    completed: false,
  },
  {
    id: '7',
    title: 'Manejo avanzado de formularios',
    subItems: [
      'Validaciones complejas',
      'Envío de datos en base a renders condicionales',
    ],
    completed: false,
  },
  {
    id: '8',
    title: 'Gestión de peticiones a APIs con HttpClient de Angular',
    completed: false,
  },
  {
    id: '9',
    title: 'Zod o similar para tipar los responses',
    subtitle: '(Desconozco si Angular trae esto de manera nativa)',
    completed: false,
  },
  {
    id: '10',
    title: 'Interfaces o tipos complejos en TypeScript orientados a Angular',
    completed: false,
  },
  {
    id: '11',
    title: 'Unit testing',
    completed: false,
  },
];
