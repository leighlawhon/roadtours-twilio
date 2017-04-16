db.dropDatabase();

var tours = [
  { customerName: 'Chewy-1897',   customerPhoneNumber: '+12028219726',  status : 'Ready', notificationStatus : 'None' },
  { customerName: 'Innana-1598',   customerPhoneNumber: '+12028219726' , status : 'Ready', notificationStatus : 'None'  },
];

db.tours.insert(tours);
