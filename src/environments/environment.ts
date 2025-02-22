export const environment = {
  baseUrl: 'http://localhost:8080/api/',
  statuses: [
    { eng: 'PENDING', it: 'In attesa' },
    { eng: 'CONFIRMED', it: 'Confermato' },
    { eng: 'CANCELLED', it: 'Annullato' },
  ],
  days: [
    { eng: 'SUNDAY', it: 'Domenica' },
    { eng: 'MONDAY', it: 'Lunedì' },
    { eng: 'TUESDAY', it: 'Martedì' },
    { eng: 'WEDNESDAY', it: 'Mercoledì' },
    { eng: 'THURSDAY', it: 'Giovedì' },
    { eng: 'FRIDAY', it: 'Venerdì' },
    { eng: 'SATURDAY', it: 'Sabato' },
  ],
  frequency: [
    { eng: 'DAILY', it: 'Giornaliera' },
    { eng: 'WEEKLY', it: 'Settimanale' },
    { eng: 'MONTHLY', it: 'Mensile' },
    { eng: 'QUARTERLY', it: 'Trimestrale' },
    { eng: 'SEMIANNUAL', it: 'Semestrale' },
  ],
  prefixes: [
    '+355', // Albania
    '+376', // Andorra
    '+43', // Austria
    '+32', // Belgio
    '+387', // Bosnia ed Erzegovina
    '+359', // Bulgaria
    '+385', // Croazia
    '+357', // Cipro
    '+420', // Repubblica Ceca
    '+45', // Danimarca
    '+372', // Estonia
    '+358', // Finlandia
    '+33', // Francia
    '+49', // Germania
    '+30', // Grecia
    '+36', // Ungheria
    '+354', // Islanda
    '+353', // Irlanda
    '+39', // Italia
    '+371', // Lettonia
    '+423', // Liechtenstein
    '+370', // Lituania
    '+352', // Lussemburgo
    '+356', // Malta
    '+373', // Moldavia
    '+377', // Monaco
    '+382', // Montenegro
    '+31', // Paesi Bassi
    '+389', // Macedonia del Nord
    '+47', // Norvegia
    '+48', // Polonia
    '+351', // Portogallo
    '+40', // Romania
    '+7', // Russia
    '+378', // San Marino
    '+381', // Serbia
    '+421', // Slovacchia
    '+386', // Slovenia
    '+34', // Spagna
    '+46', // Svezia
    '+41', // Svizzera
    '+90', // Turchia
    '+380', // Ucraina
    '+44', // Regno Unito
    '+379', // Città del Vaticano
  ],
};
