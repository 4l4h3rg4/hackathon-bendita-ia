from typing import List, Dict, Any

MOCK_EVIDENCE = {
  "id": 'ev-101',
  "title": "Eficacia de la Robótica en la Rehabilitación de la Parálisis Cerebral Infantil",
  "authors": ["García A.", "Mendoza L.", "Smith J."],
  "year": 2023,
  "journal": "Journal of Pediatric Rehabilitation",
  "type": "Meta-analysis",
  "relevance": "Alta",
  "abstract": "Un análisis sistemático de 15 ensayos controlados aleatorizados que demuestra mejoras significativas en la función motora gruesa..."
}

MOCK_PATIENT = {
  "id": '1234',
  "name": "Juan P.",
  "diagnosis": "Hemiparesia Espástica Derecha",
  "lastVisit": "14 Nov 2023",
  "adherenceRate": 45,
  "alerts": ["Baja adherencia detectada", "Faltó a 2 sesiones consecutivas"]
}

MOCK_ANONYMIZATION = [
  {
    "id": 'row-1',
    "original": { "nombre": "Juan Pérez González", "rut": "12.345.678-9", "diagnostico": "Parálisis Cerebral", "direccion": "Av. Providencia 1234" },
    "anonymized": { "nombre": "J.P.G.", "rut": "xxxxxxxx-9", "diagnostico": "G80.9", "direccion": "Comuna: Providencia" }
  },
  {
    "id": 'row-2',
    "original": { "nombre": "María Soto Silva", "rut": "21.987.654-K", "diagnostico": "Espina Bífida", "direccion": "Calle Los Alerces 555" },
    "anonymized": { "nombre": "M.S.S.", "rut": "xxxxxxxx-K", "diagnostico": "Q05.9", "direccion": "Comuna: Ñuñoa" }
  },
  {
    "id": 'row-3',
    "original": { "nombre": "Diego Tapia R.", "rut": "15.444.333-2", "diagnostico": "Distrofia Muscular", "direccion": "Pje. El Roble 22" },
    "anonymized": { "nombre": "D.T.R.", "rut": "xxxxxxxx-2", "diagnostico": "G71.0", "direccion": "Comuna: Maipú" }
  }
]

MOCK_CONTACTS = [
    {
        "id": '1',
        "name": 'Dra. Ana María Polo',
        "specialty": 'Neurología Infantil',
        "avatar": 'https://i.pravatar.cc/150?u=1',
        "status": 'online',
        "lastMessage": '¿Pudiste revisar el caso de Martín?',
        "lastMessageTime": '10:30 AM',
        "unreadCount": 2,
    },
    {
        "id": '2',
        "name": 'Dr. Sebastián Silva',
        "specialty": 'Kinesiología',
        "avatar": 'https://i.pravatar.cc/150?u=2',
        "status": 'busy',
        "lastMessage": 'El paciente respondió bien a la terapia.',
        "lastMessageTime": 'Ayer',
        "unreadCount": 0,
    },
    {
        "id": '3',
        "name": 'Dra. Valentina Rojas',
        "specialty": 'Fisiatría',
        "avatar": 'https://i.pravatar.cc/150?u=3',
        "status": 'offline',
        "lastMessage": 'Te envío los informes en un momento.',
        "lastMessageTime": 'Lun',
        "unreadCount": 0,
    },
]

MOCK_MESSAGES = {
    '1': [
        { "id": 'm1', "senderId": '1', "text": 'Hola Dr. Castillo, ¿cómo estás?', "timestamp": '10:00 AM', "isMe": False },
        { "id": 'm2', "senderId": 'me', "text": 'Hola Dra. Polo, todo bien por acá. ¿Qué tal?', "timestamp": '10:05 AM', "isMe": True },
        { "id": 'm3', "senderId": '1', "text": 'Quería consultarte sobre el paciente Martín Pérez. He notado una leve mejoría en su marcha.', "timestamp": '10:15 AM', "isMe": False },
        { "id": 'm4', "senderId": '1', "text": '¿Pudiste revisar el caso de Martín?', "timestamp": '10:30 AM', "isMe": False },
    ],
    '2': [
        { "id": 'm1', "senderId": '2', "text": 'Hola, te cuento que la sesión de hoy fue excelente.', "timestamp": 'Ayer', "isMe": False },
        { "id": 'm2', "senderId": '2', "text": 'El paciente respondió bien a la terapia.', "timestamp": 'Ayer', "isMe": False },
    ],
    '3': [
        { "id": 'm1', "senderId": 'me', "text": 'Hola Valentina, necesito los informes de kine.', "timestamp": 'Lun', "isMe": True },
        { "id": 'm2', "senderId": '3', "text": 'Te envío los informes en un momento.', "timestamp": 'Lun', "isMe": False },
    ]
}
