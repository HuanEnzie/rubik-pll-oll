import { AlgorithmCase, OLLPattern } from '../types';

export const OLL_CASES: AlgorithmCase[] = [
  {
    "id": "oll-1",
    "type": "OLL",
    "number": 1,
    "name": "OLL 1",
    "aka": [
      "Runway",
      "Dot 8"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          true,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "1-1",
        "notation": "R U2 R2' F R F' U2 R' F R F'",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "1-2",
        "notation": "F (R U R' U') F' f (R U R' U') f'",
        "description": "Biến thể F sexy F' f sexy f'"
      }
    ],
    "tags": [
      "dot",
      "runway",
      "oll 1"
    ]
  },
  {
    "id": "oll-2",
    "type": "OLL",
    "number": 2,
    "name": "OLL 2",
    "aka": [
      "Zamboni",
      "Dot 7"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          true
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "2-1",
        "notation": "F (R U R' U') F' f (R U R' U') f'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "2-2",
        "notation": "r U r' U2 r U2 R' U2 R U' r'",
        "description": "Biến thể r-slice"
      }
    ],
    "tags": [
      "dot",
      "zamboni",
      "oll 2"
    ]
  },
  {
    "id": "oll-3",
    "type": "OLL",
    "number": 3,
    "name": "OLL 3",
    "aka": [
      "Anti-Alien",
      "Dot 5"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          true,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "3-1",
        "notation": "f (R U R' U') f' U' F (R U R' U') F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "3-2",
        "notation": "r' R2 U R' U r U2 r' U M'",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "dot",
      "alien",
      "anti-alien",
      "oll 3"
    ]
  },
  {
    "id": "oll-4",
    "type": "OLL",
    "number": 4,
    "name": "OLL 4",
    "aka": [
      "Alien",
      "Dot 6"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          true,
          true
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "4-1",
        "notation": "f (R U R' U') f' U F (R U R' U') F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "4-2",
        "notation": "M U' r U2 r' U' R U' R' M'",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "dot",
      "alien",
      "oll 4"
    ]
  },
  {
    "id": "oll-5",
    "type": "OLL",
    "number": 5,
    "name": "OLL 5",
    "aka": [
      "Righty Square",
      "Right Back Breeze"
    ],
    "category": "Square",
    "groupNameVi": "Hình vuông (Square)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          false,
          false,
          false
        ],
        "W": [
          false,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "5-1",
        "notation": "r' U2 R U R' U r",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "5-2",
        "notation": "l' U2 L U L' U l",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "square",
      "breeze",
      "oll 5"
    ]
  },
  {
    "id": "oll-6",
    "type": "OLL",
    "number": 6,
    "name": "OLL 6",
    "aka": [
      "Lefty Square",
      "Left Back Breeze"
    ],
    "category": "Square",
    "groupNameVi": "Hình vuông (Square)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          false,
          true
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "6-1",
        "notation": "r U2 R' U' R U' r'",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "6-2",
        "notation": "l U2 L' U' L U' l'",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "square",
      "breeze",
      "oll 6"
    ]
  },
  {
    "id": "oll-7",
    "type": "OLL",
    "number": 7,
    "name": "OLL 7",
    "aka": [
      "Lightning 1",
      "Small Lightning 1"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          true,
          true,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "7-1",
        "notation": "r U R' U R U2' r'",
        "isPreferred": true,
        "description": "Chuẩn Wide Sune"
      },
      {
        "id": "7-2",
        "notation": "l U L' U L U2' l'",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "lightning",
      "kite",
      "oll 7"
    ]
  },
  {
    "id": "oll-8",
    "type": "OLL",
    "number": 8,
    "name": "OLL 8",
    "aka": [
      "Lightning 2",
      "Small Lightning 2"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "8-1",
        "notation": "l' U' L U' L' U2 l",
        "isPreferred": true,
        "description": "Chuẩn Wide Anti-Sune"
      },
      {
        "id": "8-2",
        "notation": "r' U' R U' R' U2 r",
        "description": "Biến thể tay phải"
      }
    ],
    "tags": [
      "lightning",
      "anti-kite",
      "oll 8"
    ]
  },
  {
    "id": "oll-9",
    "type": "OLL",
    "number": 9,
    "name": "OLL 9",
    "aka": [
      "Kite",
      "Fish 1"
    ],
    "category": "Fish",
    "groupNameVi": "Con cá (Fish)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "9-1",
        "notation": "R U R' U' R' F R2 U R' U' F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "9-2",
        "notation": "f (R U R' U') f' U F (R U R' U') F'",
        "description": "Biến thể f-turn"
      }
    ],
    "tags": [
      "fish",
      "kite",
      "oll 9"
    ]
  },
  {
    "id": "oll-10",
    "type": "OLL",
    "number": 10,
    "name": "OLL 10",
    "aka": [
      "Anti-Kite",
      "Fish 2"
    ],
    "category": "Fish",
    "groupNameVi": "Con cá (Fish)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          false,
          true
        ],
        "W": [
          false,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "10-1",
        "notation": "R U R' U R' F R F' R U2' R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "10-2",
        "notation": "F U R U' R' F' R U R' U'",
        "description": "Biến thể thay thế"
      }
    ],
    "tags": [
      "fish",
      "anti-kite",
      "oll 10"
    ]
  },
  {
    "id": "oll-11",
    "type": "OLL",
    "number": 11,
    "name": "OLL 11",
    "aka": [
      "Flying Fish 1",
      "Small L 1"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          false,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "11-1",
        "notation": "r U R' U R' F R F' R U2' r'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "11-2",
        "notation": "M U R U R' U' R' F R F' M'",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "lightning",
      "flying fish",
      "oll 11"
    ]
  },
  {
    "id": "oll-12",
    "type": "OLL",
    "number": 12,
    "name": "OLL 12",
    "aka": [
      "Flying Fish 2",
      "Small L 2"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "12-1",
        "notation": "M' U' R U' R' U2 R U' R' U' M",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "12-2",
        "notation": "F (R U R' U') F' U2 F (R U R' U') F'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "lightning",
      "flying fish",
      "oll 12"
    ]
  },
  {
    "id": "oll-13",
    "type": "OLL",
    "number": 13,
    "name": "OLL 13",
    "aka": [
      "Gun 1",
      "Knight Move 1"
    ],
    "category": "Knight",
    "groupNameVi": "Nước đi mã (Knight)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "13-1",
        "notation": "r U' r' U' r U r' y' R' U R",
        "isPreferred": true,
        "description": "Chuẩn r-slice"
      },
      {
        "id": "13-2",
        "notation": "F U R U2' R' U' R U R' F'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "knight",
      "gun",
      "oll 13"
    ]
  },
  {
    "id": "oll-14",
    "type": "OLL",
    "number": 14,
    "name": "OLL 14",
    "aka": [
      "Anti-Gun",
      "Knight Move 2"
    ],
    "category": "Knight",
    "groupNameVi": "Nước đi mã (Knight)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "14-1",
        "notation": "R' F R U R' F' R F U' F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "14-2",
        "notation": "F' U' L' U2 L U L' U' L F",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "knight",
      "anti-gun",
      "oll 14"
    ]
  },
  {
    "id": "oll-15",
    "type": "OLL",
    "number": 15,
    "name": "OLL 15",
    "aka": [
      "Squeegee",
      "Knight Move 3"
    ],
    "category": "Knight",
    "groupNameVi": "Nước đi mã (Knight)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          false,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "15-1",
        "notation": "l' U' l L' U' L U l' U l",
        "isPreferred": true,
        "description": "Chuẩn tay trái"
      },
      {
        "id": "15-2",
        "notation": "r' U' r R' U' R U r' U r",
        "description": "Biến thể r-slice"
      }
    ],
    "tags": [
      "knight",
      "squeegee",
      "oll 15"
    ]
  },
  {
    "id": "oll-16",
    "type": "OLL",
    "number": 16,
    "name": "OLL 16",
    "aka": [
      "Anti-Squeegee",
      "Knight Move 4"
    ],
    "category": "Knight",
    "groupNameVi": "Nước đi mã (Knight)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          false,
          true
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "16-1",
        "notation": "r U r' R U R' U' r U' r'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "16-2",
        "notation": "R' F R U R' U' F' R U' R' U2 R",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "knight",
      "anti-squeegee",
      "oll 16"
    ]
  },
  {
    "id": "oll-17",
    "type": "OLL",
    "number": 17,
    "name": "OLL 17",
    "aka": [
      "Diagonal Dot",
      "Slash"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          false,
          false
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          true,
          false,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "17-1",
        "notation": "F R' F' R2 r' U R U' r' R U'",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "17-2",
        "notation": "R U R' U R' F R F' U2 R' F R F'",
        "description": "Biến thể cơ bản"
      }
    ],
    "tags": [
      "dot",
      "slash",
      "oll 17"
    ]
  },
  {
    "id": "oll-18",
    "type": "OLL",
    "number": 18,
    "name": "OLL 18",
    "aka": [
      "Crown Dot"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          true
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          true,
          true,
          true
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "18-1",
        "notation": "r U R' U R U2' r2' U' R U' R' U2 r",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "18-2",
        "notation": "F (R U R' U') F' U2 F (R U R' U') F'",
        "description": "Biến thể 2 F-sexy"
      }
    ],
    "tags": [
      "dot",
      "crown",
      "oll 18"
    ]
  },
  {
    "id": "oll-19",
    "type": "OLL",
    "number": 19,
    "name": "OLL 19",
    "aka": [
      "Mushroom Dot"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          true
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          true,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "19-1",
        "notation": "M U R U R' U' M' R' F R F'",
        "isPreferred": true,
        "description": "Chuẩn M-slice"
      },
      {
        "id": "19-2",
        "notation": "r' R U R U R' U' r R2' F R F'",
        "description": "Biến thể r-slice"
      }
    ],
    "tags": [
      "dot",
      "mushroom",
      "oll 19"
    ]
  },
  {
    "id": "oll-20",
    "type": "OLL",
    "number": 20,
    "name": "OLL 20",
    "aka": [
      "Checkered Dot",
      "X Dot"
    ],
    "category": "Dot",
    "groupNameVi": "Dấu chấm (Dot)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          true
        ],
        [
          false,
          true,
          false
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "20-1",
        "notation": "M U R U R' U' M2' U R U' r'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "20-2",
        "notation": "r U R' U' M2' U R U' R' U' M'",
        "description": "Biến thể thay thế"
      }
    ],
    "tags": [
      "dot",
      "checkered",
      "x",
      "oll 20"
    ]
  },
  {
    "id": "oll-21",
    "type": "OLL",
    "number": 21,
    "name": "OLL 21",
    "aka": [
      "H",
      "Double Sune",
      "Cross 1"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          false,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "21-1",
        "notation": "R U2 R' U' R U R' U' R U' R'",
        "isPreferred": true,
        "description": "Chuẩn Double Sune"
      },
      {
        "id": "21-2",
        "notation": "F (R U R' U')3 F'",
        "description": "F (sexy)3 F'"
      }
    ],
    "tags": [
      "cross",
      "h",
      "double sune",
      "oll 21"
    ]
  },
  {
    "id": "oll-22",
    "type": "OLL",
    "number": 22,
    "name": "OLL 22",
    "aka": [
      "Pi",
      "Wheel",
      "Cross 2"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          false,
          true
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "22-1",
        "notation": "R U2' R2' U' R2 U' R2' U2' R",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "22-2",
        "notation": "f (R U R' U') f' F (R U R' U') F'",
        "description": "Biến thể dễ học"
      }
    ],
    "tags": [
      "cross",
      "pi",
      "wheel",
      "oll 22"
    ]
  },
  {
    "id": "oll-23",
    "type": "OLL",
    "number": 23,
    "name": "OLL 23",
    "aka": [
      "Headlights",
      "U",
      "Cross 3"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          false,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "23-1",
        "notation": "R2 D R' U2 R D' R' U2 R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "23-2",
        "notation": "R2 D' R U2 R' D R U2 R",
        "description": "Biến thể ngược"
      }
    ],
    "tags": [
      "cross",
      "headlights",
      "u",
      "oll 23"
    ]
  },
  {
    "id": "oll-24",
    "type": "OLL",
    "number": 24,
    "name": "OLL 24",
    "aka": [
      "Chameleon",
      "T",
      "Cross 4"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          true,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "24-1",
        "notation": "r U R' U' r' F R F'",
        "isPreferred": true,
        "description": "Sexy move + Sledge"
      },
      {
        "id": "24-2",
        "notation": "R' F' r U R U' r' F",
        "description": "Biến thể thay thế"
      }
    ],
    "tags": [
      "cross",
      "chameleon",
      "t",
      "oll 24"
    ]
  },
  {
    "id": "oll-25",
    "type": "OLL",
    "number": 25,
    "name": "OLL 25",
    "aka": [
      "Bowtie",
      "L",
      "Cross 5"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          false,
          true
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "25-1",
        "notation": "F' r U R' U' r' F R",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "25-2",
        "notation": "x' R U R' D R U' R' D' x",
        "description": "Commutator góc"
      }
    ],
    "tags": [
      "cross",
      "bowtie",
      "l",
      "oll 25"
    ]
  },
  {
    "id": "oll-26",
    "type": "OLL",
    "number": 26,
    "name": "OLL 26",
    "aka": [
      "Anti-Sune",
      "Fish 2",
      "Cross 6"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          false,
          true
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "26-1",
        "notation": "R' U' R U' R' U2 R",
        "isPreferred": true,
        "description": "Anti-Sune chuẩn"
      },
      {
        "id": "26-2",
        "notation": "R U2 R' U' R U' R'",
        "description": "Sune ngược"
      }
    ],
    "tags": [
      "cross",
      "anti-sune",
      "oll 26"
    ]
  },
  {
    "id": "oll-27",
    "type": "OLL",
    "number": 27,
    "name": "OLL 27",
    "aka": [
      "Sune",
      "Fish 1",
      "Cross 7"
    ],
    "category": "Cross",
    "groupNameVi": "Chữ thập (Cross)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          false,
          false,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "27-1",
        "notation": "R U R' U R U2' R'",
        "isPreferred": true,
        "description": "Sune quốc dân"
      },
      {
        "id": "27-2",
        "notation": "y' R' U2 R U R' U R",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "cross",
      "sune",
      "oll 27"
    ]
  },
  {
    "id": "oll-28",
    "type": "OLL",
    "number": 28,
    "name": "OLL 28",
    "aka": [
      "Stealth",
      "Corners 1"
    ],
    "category": "Corners",
    "groupNameVi": "Góc xoay (Corners)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "28-1",
        "notation": "r U R' U' r' R U R U' R'",
        "isPreferred": true,
        "description": "Chuẩn r-slice"
      },
      {
        "id": "28-2",
        "notation": "M' U M U2 M' U M",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "corners",
      "stealth",
      "oll 28"
    ]
  },
  {
    "id": "oll-29",
    "type": "OLL",
    "number": 29,
    "name": "OLL 29",
    "aka": [
      "Spotted Camouflage",
      "Awkward 3"
    ],
    "category": "Awkward",
    "groupNameVi": "Hình bất đối xứng (Awkward)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "29-1",
        "notation": "R U R' U' R U' R' F' U' F R U R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "29-2",
        "notation": "M U R U R' U' R' F R F' M'",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "awkward",
      "camouflage",
      "oll 29"
    ]
  },
  {
    "id": "oll-30",
    "type": "OLL",
    "number": 30,
    "name": "OLL 30",
    "aka": [
      "Anti-Spotted Camouflage",
      "Awkward 4"
    ],
    "category": "Awkward",
    "groupNameVi": "Hình bất đối xứng (Awkward)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          true,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "30-1",
        "notation": "F R' F R2 U' R' U' R U R' F2",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "30-2",
        "notation": "r' D' r U' r' D r U r U' r'",
        "description": "Biến thể r-slice"
      }
    ],
    "tags": [
      "awkward",
      "anti-camouflage",
      "oll 30"
    ]
  },
  {
    "id": "oll-31",
    "type": "OLL",
    "number": 31,
    "name": "OLL 31",
    "aka": [
      "Couch 1",
      "P-Shape 1"
    ],
    "category": "P",
    "groupNameVi": "Chữ P (P-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "31-1",
        "notation": "R' U' F U R U' R' F' R",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "31-2",
        "notation": "S' L' U' L U S U L F' L' F",
        "description": "Biến thể S-slice"
      }
    ],
    "tags": [
      "p-shape",
      "couch",
      "oll 31"
    ]
  },
  {
    "id": "oll-32",
    "type": "OLL",
    "number": 32,
    "name": "OLL 32",
    "aka": [
      "Couch 2",
      "P-Shape 2"
    ],
    "category": "P",
    "groupNameVi": "Chữ P (P-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "32-1",
        "notation": "R U B' U' R' U R B R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "32-2",
        "notation": "L U F U' L' U L F' L'",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "p-shape",
      "couch",
      "oll 32"
    ]
  },
  {
    "id": "oll-33",
    "type": "OLL",
    "number": 33,
    "name": "OLL 33",
    "aka": [
      "T-Shape 1"
    ],
    "category": "T",
    "groupNameVi": "Chữ T (T-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "33-1",
        "notation": "R U R' U' R' F R F'",
        "isPreferred": true,
        "description": "Sexy move + Sledgehammer"
      },
      {
        "id": "33-2",
        "notation": "F R U R' U' F'",
        "description": "Biến thể cơ bản"
      }
    ],
    "tags": [
      "t-shape",
      "oll 33"
    ]
  },
  {
    "id": "oll-34",
    "type": "OLL",
    "number": 34,
    "name": "OLL 34",
    "aka": [
      "City",
      "C-Shape 1"
    ],
    "category": "C",
    "groupNameVi": "Chữ C (C-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "34-1",
        "notation": "R U R2' U' R' F R U R U' F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "34-2",
        "notation": "R U R' U' B' R' F R F' B",
        "description": "Biến thể B-turn"
      }
    ],
    "tags": [
      "c-shape",
      "city",
      "oll 34"
    ]
  },
  {
    "id": "oll-35",
    "type": "OLL",
    "number": 35,
    "name": "OLL 35",
    "aka": [
      "Fish 3"
    ],
    "category": "Fish",
    "groupNameVi": "Con cá (Fish)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          false,
          false
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "35-1",
        "notation": "R U2' R2' F R F' R U2' R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "35-2",
        "notation": "f R U R' U' f' R U R' U' R U' R'",
        "description": "Biến thể f sexy"
      }
    ],
    "tags": [
      "fish",
      "oll 35"
    ]
  },
  {
    "id": "oll-36",
    "type": "OLL",
    "number": 36,
    "name": "OLL 36",
    "aka": [
      "W-Shape 1"
    ],
    "category": "W",
    "groupNameVi": "Chữ W (W-Shape)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "36-1",
        "notation": "L' U' L U' L' U L U L F' L' F",
        "isPreferred": true,
        "description": "Chuẩn tay trái"
      },
      {
        "id": "36-2",
        "notation": "R' U' R U' R' U R U R B' R' B",
        "description": "Biến thể B-turn"
      }
    ],
    "tags": [
      "w-shape",
      "oll 36"
    ]
  },
  {
    "id": "oll-37",
    "type": "OLL",
    "number": 37,
    "name": "OLL 37",
    "aka": [
      "Mounted Gun",
      "Fish 4"
    ],
    "category": "Fish",
    "groupNameVi": "Con cá (Fish)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          true,
          true,
          false
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "37-1",
        "notation": "F R' F' R U R U' R'",
        "isPreferred": true,
        "description": "Sledgehammer + Sexy"
      },
      {
        "id": "37-2",
        "notation": "F R U' R' U' R U R' F'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "fish",
      "mounted gun",
      "oll 37"
    ]
  },
  {
    "id": "oll-38",
    "type": "OLL",
    "number": 38,
    "name": "OLL 38",
    "aka": [
      "W-Shape 2"
    ],
    "category": "W",
    "groupNameVi": "Chữ W (W-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          false,
          true,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "38-1",
        "notation": "R U R' U R U' R' U' R' F R F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "38-2",
        "notation": "F R U' R' U' R U R' F'",
        "description": "F inverse sexy F'"
      }
    ],
    "tags": [
      "w-shape",
      "oll 38"
    ]
  },
  {
    "id": "oll-39",
    "type": "OLL",
    "number": 39,
    "name": "OLL 39",
    "aka": [
      "Fung",
      "Lightning 3"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          false
        ],
        "E": [
          false,
          false,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "39-1",
        "notation": "L F' L' U' L U F U' L'",
        "isPreferred": true,
        "description": "Chuẩn tay trái"
      },
      {
        "id": "39-2",
        "notation": "R B' R' U' R U B U' R'",
        "description": "Biến thể B-turn"
      }
    ],
    "tags": [
      "lightning",
      "fung",
      "oll 39"
    ]
  },
  {
    "id": "oll-40",
    "type": "OLL",
    "number": 40,
    "name": "OLL 40",
    "aka": [
      "Anti-Fung",
      "Lightning 4"
    ],
    "category": "Lightning",
    "groupNameVi": "Tia sét (Lightning)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "40-1",
        "notation": "R' F R U R' U' F' U R",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "40-2",
        "notation": "f R U R' U' f'",
        "description": "Biến thể đơn giản"
      }
    ],
    "tags": [
      "lightning",
      "anti-fung",
      "oll 40"
    ]
  },
  {
    "id": "oll-41",
    "type": "OLL",
    "number": 41,
    "name": "OLL 41",
    "aka": [
      "Awkward 1"
    ],
    "category": "Awkward",
    "groupNameVi": "Hình bất đối xứng (Awkward)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          true
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "41-1",
        "notation": "R U R' U R U2' R' F R U R' U' F'",
        "isPreferred": true,
        "description": "Sune + F sexy F'"
      },
      {
        "id": "41-2",
        "notation": "R U' R' U2 R U y R U' R' U' F'",
        "description": "Biến thể rotation"
      }
    ],
    "tags": [
      "awkward",
      "oll 41"
    ]
  },
  {
    "id": "oll-42",
    "type": "OLL",
    "number": 42,
    "name": "OLL 42",
    "aka": [
      "Awkward 2"
    ],
    "category": "Awkward",
    "groupNameVi": "Hình bất đối xứng (Awkward)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          true
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "42-1",
        "notation": "R' U2 R U R' U R U F R U R' U' F'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "42-2",
        "notation": "M U' F' L' U' L U F M'",
        "description": "Biến thể M-slice"
      }
    ],
    "tags": [
      "awkward",
      "oll 42"
    ]
  },
  {
    "id": "oll-43",
    "type": "OLL",
    "number": 43,
    "name": "OLL 43",
    "aka": [
      "Anti-P Shape",
      "P-Shape 3"
    ],
    "category": "P",
    "groupNameVi": "Chữ P (P-Shape)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          true,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          true,
          true
        ],
        "S": [
          false,
          false,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "43-1",
        "notation": "f' L' U' L U f",
        "isPreferred": true,
        "description": "f' sexy tay trái f"
      },
      {
        "id": "43-2",
        "notation": "R' U' F R' F' R U R",
        "description": "Biến thể R-turn"
      }
    ],
    "tags": [
      "p-shape",
      "oll 43"
    ]
  },
  {
    "id": "oll-44",
    "type": "OLL",
    "number": 44,
    "name": "OLL 44",
    "aka": [
      "P-Shape 4"
    ],
    "category": "P",
    "groupNameVi": "Chữ P (P-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          false,
          false
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "44-1",
        "notation": "f R U R' U' f'",
        "isPreferred": true,
        "description": "f sexy f'"
      },
      {
        "id": "44-2",
        "notation": "F U R U' R' F'",
        "description": "Biến thể F"
      }
    ],
    "tags": [
      "p-shape",
      "oll 44"
    ]
  },
  {
    "id": "oll-45",
    "type": "OLL",
    "number": 45,
    "name": "OLL 45",
    "aka": [
      "T-Shape 2"
    ],
    "category": "T",
    "groupNameVi": "Chữ T (T-Shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "45-1",
        "notation": "F R U R' U' F'",
        "isPreferred": true,
        "description": "F sexy F' quốc dân"
      },
      {
        "id": "45-2",
        "notation": "R' F' U' F U R",
        "description": "Biến thể ngược"
      }
    ],
    "tags": [
      "t-shape",
      "oll 45"
    ]
  },
  {
    "id": "oll-46",
    "type": "OLL",
    "number": 46,
    "name": "OLL 46",
    "aka": [
      "C-Shape 2"
    ],
    "category": "C",
    "groupNameVi": "Chữ C (C-Shape)",
    "ollPattern": {
      "top": [
        [
          true,
          true,
          false
        ],
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          true,
          true,
          true
        ],
        "S": [
          false,
          false,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "46-1",
        "notation": "R' U' R' F R F' U R",
        "isPreferred": true,
        "description": "Chuẩn SpeedCubeDB"
      },
      {
        "id": "46-2",
        "notation": "f R U R' U' f' U' F R U R' U' F'",
        "description": "Biến thể an toàn"
      }
    ],
    "tags": [
      "c-shape",
      "oll 46"
    ]
  },
  {
    "id": "oll-47",
    "type": "OLL",
    "number": 47,
    "name": "OLL 47",
    "aka": [
      "Anti-Breakneck",
      "L-Shape 1"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          true,
          false,
          true
        ],
        "S": [
          true,
          true,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "47-1",
        "notation": "F' L' U' L U L' U' L U F",
        "isPreferred": true,
        "description": "F' sexy2 F"
      },
      {
        "id": "47-2",
        "notation": "R' U' R' F R F' R' F R F' U R",
        "description": "Biến thể R-turn"
      }
    ],
    "tags": [
      "l",
      "breakneck",
      "oll 47"
    ]
  },
  {
    "id": "oll-48",
    "type": "OLL",
    "number": 48,
    "name": "OLL 48",
    "aka": [
      "Breakneck",
      "L-Shape 2"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          true,
          true,
          false
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          true,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "48-1",
        "notation": "F R U R' U' R U R' U' F'",
        "isPreferred": true,
        "description": "F (sexy)2 F'"
      },
      {
        "id": "48-2",
        "notation": "R U2 R' U' R U R' U' R U' R'",
        "description": "Biến thể thay thế"
      }
    ],
    "tags": [
      "l",
      "breakneck",
      "oll 48"
    ]
  },
  {
    "id": "oll-49",
    "type": "OLL",
    "number": 49,
    "name": "OLL 49",
    "aka": [
      "Right Back Squeezy",
      "L-Shape 3"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "49-1",
        "notation": "r U' r2' U r2 U r2' U' r",
        "isPreferred": true,
        "description": "Chuẩn r-slice"
      },
      {
        "id": "49-2",
        "notation": "R' F R' F' R2 U2' y R' F R F'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "l",
      "squeezy",
      "oll 49"
    ]
  },
  {
    "id": "oll-50",
    "type": "OLL",
    "number": 50,
    "name": "OLL 50",
    "aka": [
      "Right Front Squeezy",
      "L-Shape 4"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          false,
          true
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "50-1",
        "notation": "r' U r2 U' r2' U' r2 U r'",
        "isPreferred": true,
        "description": "Chuẩn r-slice"
      },
      {
        "id": "50-2",
        "notation": "R B' R B R2' U2' y R B' R' B",
        "description": "Biến thể B-turn"
      }
    ],
    "tags": [
      "l",
      "squeezy",
      "oll 50"
    ]
  },
  {
    "id": "oll-51",
    "type": "OLL",
    "number": 51,
    "name": "OLL 51",
    "aka": [
      "Bottle Cap",
      "Line 1"
    ],
    "category": "Line",
    "groupNameVi": "Đường thẳng (Line)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          true
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "51-1",
        "notation": "f R U R' U' R U R' U' f'",
        "isPreferred": true,
        "description": "Double sexy wide f"
      },
      {
        "id": "51-2",
        "notation": "F U R U' R' U R U' R' F'",
        "description": "Biến thể F"
      }
    ],
    "tags": [
      "line",
      "bottle cap",
      "oll 51"
    ]
  },
  {
    "id": "oll-52",
    "type": "OLL",
    "number": 52,
    "name": "OLL 52",
    "aka": [
      "Rice Cooker",
      "Line 2"
    ],
    "category": "Line",
    "groupNameVi": "Đường thẳng (Line)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          false,
          false
        ],
        "E": [
          true,
          true,
          true
        ],
        "S": [
          true,
          false,
          false
        ],
        "W": [
          false,
          true,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "52-1",
        "notation": "R U R' U R U' B U' B' R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "52-2",
        "notation": "R' U' R U' R' d R' U R B",
        "description": "Biến thể d-turn"
      }
    ],
    "tags": [
      "line",
      "rice cooker",
      "oll 52"
    ]
  },
  {
    "id": "oll-53",
    "type": "OLL",
    "number": 53,
    "name": "OLL 53",
    "aka": [
      "Frying Pan",
      "L-Shape 5"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          true,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          false,
          true
        ],
        "S": [
          false,
          false,
          false
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "53-1",
        "notation": "r' U' R U' R' U R U' R' U2 r",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "53-2",
        "notation": "l' U2 L U L' U' L U L' U l",
        "description": "Biến thể tay trái"
      }
    ],
    "tags": [
      "l",
      "frying pan",
      "oll 53"
    ]
  },
  {
    "id": "oll-54",
    "type": "OLL",
    "number": 54,
    "name": "OLL 54",
    "aka": [
      "Anti-Frying Pan",
      "L-Shape 6"
    ],
    "category": "L",
    "groupNameVi": "Chữ L (L-shape)",
    "ollPattern": {
      "top": [
        [
          false,
          true,
          false
        ],
        [
          false,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          false,
          false
        ],
        "E": [
          true,
          false,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          true,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "54-1",
        "notation": "r U R' U R U' R' U R U2' r'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "54-2",
        "notation": "F R U R' U' R U' R' U R U' F'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "l",
      "anti-frying pan",
      "oll 54"
    ]
  },
  {
    "id": "oll-55",
    "type": "OLL",
    "number": 55,
    "name": "OLL 55",
    "aka": [
      "Highway",
      "Line 3"
    ],
    "category": "Line",
    "groupNameVi": "Đường thẳng (Line)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          true,
          true,
          true
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          true,
          true,
          true
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "55-1",
        "notation": "R' F R U R U' R2' F' R2 U' R' U R U R'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "55-2",
        "notation": "r U2 R2' F R F' U2' r' F R F'",
        "description": "Biến thể r-turn"
      }
    ],
    "tags": [
      "line",
      "highway",
      "oll 55"
    ]
  },
  {
    "id": "oll-56",
    "type": "OLL",
    "number": 56,
    "name": "OLL 56",
    "aka": [
      "Streetlights",
      "Line 4"
    ],
    "category": "Line",
    "groupNameVi": "Đường thẳng (Line)",
    "ollPattern": {
      "top": [
        [
          false,
          false,
          false
        ],
        [
          true,
          true,
          true
        ],
        [
          false,
          false,
          false
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          true,
          false,
          true
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          true,
          false,
          true
        ]
      }
    },
    "algorithms": [
      {
        "id": "56-1",
        "notation": "r' U' r U' R' U R U' R' U R r' U r",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "56-2",
        "notation": "F R U R' U' R' F' r U R U' r'",
        "description": "Biến thể F sledge"
      }
    ],
    "tags": [
      "line",
      "streetlights",
      "oll 56"
    ]
  },
  {
    "id": "oll-57",
    "type": "OLL",
    "number": 57,
    "name": "OLL 57",
    "aka": [
      "Anti-Stealth",
      "Corners 2"
    ],
    "category": "Corners",
    "groupNameVi": "Góc xoay (Corners)",
    "ollPattern": {
      "top": [
        [
          true,
          false,
          true
        ],
        [
          true,
          true,
          true
        ],
        [
          true,
          false,
          true
        ]
      ],
      "sides": {
        "N": [
          false,
          true,
          false
        ],
        "E": [
          false,
          false,
          false
        ],
        "S": [
          false,
          true,
          false
        ],
        "W": [
          false,
          false,
          false
        ]
      }
    },
    "algorithms": [
      {
        "id": "57-1",
        "notation": "R U R' U' M' U R U' r'",
        "isPreferred": true,
        "description": "Chuẩn M-slice"
      },
      {
        "id": "57-2",
        "notation": "R U2' R2' F R F' U2' M' U R U' r'",
        "description": "Biến thể mở rộng"
      }
    ],
    "tags": [
      "corners",
      "anti-stealth",
      "oll 57"
    ]
  }
];
