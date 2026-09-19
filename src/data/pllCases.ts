import { AlgorithmCase } from '../types';

export const PLL_CASES: AlgorithmCase[] = [
  {
    "id": "pll-ua",
    "type": "PLL",
    "number": 1,
    "name": "PLL Ua",
    "aka": [
      "Ua Perm",
      "Ua"
    ],
    "category": "Edges",
    "groupNameVi": "Hoán vị cạnh (Edges)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            1,
            0
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            2
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          3,
          3
        ],
        "E": [
          5,
          4,
          5
        ],
        "S": [
          2,
          5,
          2
        ],
        "W": [
          4,
          2,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "ua-1",
        "notation": "R U' R U R U R U' R' U' R2",
        "isPreferred": true,
        "description": "R-U Speedcubing"
      },
      {
        "id": "ua-2",
        "notation": "M2' U M U2 M' U M2'",
        "description": "M-slice kinh điển (Rất nhanh nếu quen fingertrick)"
      }
    ],
    "tags": [
      "edges",
      "ua",
      "u perm",
      "pll ua"
    ]
  },
  {
    "id": "pll-ub",
    "type": "PLL",
    "number": 2,
    "name": "PLL Ub",
    "aka": [
      "Ub Perm",
      "Ub"
    ],
    "category": "Edges",
    "groupNameVi": "Hoán vị cạnh (Edges)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          3,
          3
        ],
        "E": [
          5,
          2,
          5
        ],
        "S": [
          2,
          4,
          2
        ],
        "W": [
          4,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "ub-1",
        "notation": "R2 U R U R' U' R' U' R' U R'",
        "isPreferred": true,
        "description": "R-U Chuẩn speedcubing"
      },
      {
        "id": "ub-2",
        "notation": "M2' U' M U2 M' U' M2'",
        "description": "M-slice kinh điển"
      }
    ],
    "tags": [
      "edges",
      "ub",
      "u perm",
      "pll ub"
    ]
  },
  {
    "id": "pll-h",
    "type": "PLL",
    "number": 3,
    "name": "PLL H",
    "aka": [
      "H Perm",
      "H"
    ],
    "category": "Edges",
    "groupNameVi": "Hoán vị cạnh (Edges)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ],
          "twoWay": true
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          2,
          3
        ],
        "E": [
          5,
          4,
          5
        ],
        "S": [
          2,
          3,
          2
        ],
        "W": [
          4,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "h-1",
        "notation": "M2' U M2' U2 M2' U M2'",
        "isPreferred": true,
        "description": "M-slice siêu tốc"
      },
      {
        "id": "h-2",
        "notation": "M2' U' M2' U2 M2' U' M2'",
        "description": "Biến thể U' ngược chiều"
      }
    ],
    "tags": [
      "edges",
      "h",
      "h perm",
      "pll h"
    ]
  },
  {
    "id": "pll-z",
    "type": "PLL",
    "number": 4,
    "name": "PLL Z",
    "aka": [
      "Z Perm",
      "Z"
    ],
    "category": "Edges",
    "groupNameVi": "Hoán vị cạnh (Edges)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            0
          ],
          "to": [
            0,
            2
          ]
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ]
        },
        {
          "from": [
            2,
            0
          ],
          "to": [
            0,
            0
          ]
        },
        {
          "from": [
            2,
            2
          ],
          "to": [
            2,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          5,
          2,
          5
        ],
        "E": [
          2,
          5,
          2
        ],
        "S": [
          4,
          3,
          4
        ],
        "W": [
          3,
          4,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "z-1",
        "notation": "M' U M2' U M2' U M' U2 M2'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "z-2",
        "notation": "M2' U M2' U M' U2 M2' U2 M'",
        "description": "Biến thể M2 bắt đầu"
      }
    ],
    "tags": [
      "edges",
      "z",
      "z perm",
      "pll z"
    ]
  },
  {
    "id": "pll-aa",
    "type": "PLL",
    "number": 5,
    "name": "PLL Aa",
    "aka": [
      "Aa Perm",
      "Aa"
    ],
    "category": "Corners",
    "groupNameVi": "Hoán vị góc (Corners)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            0,
            2
          ]
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ]
        },
        {
          "from": [
            2,
            2
          ],
          "to": [
            0,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          5,
          3,
          5
        ],
        "E": [
          2,
          5,
          4
        ],
        "S": [
          2,
          2,
          3
        ],
        "W": [
          3,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "aa-1",
        "notation": "x R' U R' D2 R U' R' D2 R2 x'",
        "isPreferred": true,
        "description": "Chuẩn x-rotation"
      },
      {
        "id": "aa-2",
        "notation": "y' x' R2 D2 R' U' R D2 R' U R' x",
        "description": "Biến thể từ phía sau"
      }
    ],
    "tags": [
      "corners",
      "aa",
      "a perm",
      "pll aa"
    ]
  },
  {
    "id": "pll-ab",
    "type": "PLL",
    "number": 6,
    "name": "PLL Ab",
    "aka": [
      "Ab Perm",
      "Ab"
    ],
    "category": "Corners",
    "groupNameVi": "Hoán vị góc (Corners)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            2
          ]
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            0,
            0
          ]
        },
        {
          "from": [
            2,
            2
          ],
          "to": [
            0,
            2
          ]
        }
      ],
      "sideColors": {
        "N": [
          2,
          3,
          4
        ],
        "E": [
          3,
          5,
          3
        ],
        "S": [
          2,
          2,
          5
        ],
        "W": [
          5,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "ab-1",
        "notation": "x R2' D2 (R U R') D2 (R U' R) x'",
        "isPreferred": true,
        "description": "Chuẩn x-rotation"
      },
      {
        "id": "ab-2",
        "notation": "x' (R U' R) D2 (R' U R) D2 R2' x",
        "description": "Biến thể đối xứng"
      }
    ],
    "tags": [
      "corners",
      "ab",
      "a perm",
      "pll ab"
    ]
  },
  {
    "id": "pll-e",
    "type": "PLL",
    "number": 7,
    "name": "PLL E",
    "aka": [
      "E Perm",
      "E"
    ],
    "category": "Corners",
    "groupNameVi": "Hoán vị góc (Corners)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            0
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          4,
          3,
          5
        ],
        "E": [
          2,
          5,
          3
        ],
        "S": [
          4,
          2,
          5
        ],
        "W": [
          2,
          4,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "e-1",
        "notation": "x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D') x",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "e-2",
        "notation": "y x' (R U' R' D) (R U R' D')2 (R U' R' D) x",
        "description": "Biến thể commutator"
      }
    ],
    "tags": [
      "corners",
      "e",
      "e perm",
      "pll e"
    ]
  },
  {
    "id": "pll-ga",
    "type": "PLL",
    "number": 8,
    "name": "PLL Ga",
    "aka": [
      "Ga Perm",
      "Ga"
    ],
    "category": "G Perms",
    "groupNameVi": "G-Permutations",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            0,
            1
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            2
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          2,
          5
        ],
        "E": [
          2,
          4,
          3
        ],
        "S": [
          2,
          5,
          5
        ],
        "W": [
          4,
          3,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "ga-1",
        "notation": "R2 U (R' U R' U') (R U' R2) D (U' R' U R) D'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "ga-2",
        "notation": "R2 u (R' U R' U') R u' R2 y' (R' U R)",
        "description": "Biến thể u-turn"
      }
    ],
    "tags": [
      "g perms",
      "ga",
      "g perm",
      "pll ga"
    ]
  },
  {
    "id": "pll-gb",
    "type": "PLL",
    "number": 9,
    "name": "PLL Gb",
    "aka": [
      "Gb Perm",
      "Gb"
    ],
    "category": "G Perms",
    "groupNameVi": "G-Permutations",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            0,
            1
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          4,
          5
        ],
        "E": [
          2,
          2,
          3
        ],
        "S": [
          2,
          3,
          5
        ],
        "W": [
          4,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "gb-1",
        "notation": "(R' U' R) y (R2 u R' U) (R U' R u') R2'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "gb-2",
        "notation": "F' U' F (R2 u R' U) (R U' R u') R2'",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "g perms",
      "gb",
      "g perm",
      "pll gb"
    ]
  },
  {
    "id": "pll-gc",
    "type": "PLL",
    "number": 10,
    "name": "PLL Gc",
    "aka": [
      "Gc Perm",
      "Gc"
    ],
    "category": "G Perms",
    "groupNameVi": "G-Permutations",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            0,
            1
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          5,
          5
        ],
        "E": [
          2,
          4,
          3
        ],
        "S": [
          2,
          3,
          5
        ],
        "W": [
          4,
          2,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "gc-1",
        "notation": "R2 U' (R U' R U) (R' U R2) D' (U R U' R') D",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "gc-2",
        "notation": "y2 R2' u' (R U' R U) R' u R2 y (R U' R')",
        "description": "Biến thể u-turn"
      }
    ],
    "tags": [
      "g perms",
      "gc",
      "g perm",
      "pll gc"
    ]
  },
  {
    "id": "pll-gd",
    "type": "PLL",
    "number": 11,
    "name": "PLL Gd",
    "aka": [
      "Gd Perm",
      "Gd"
    ],
    "category": "G Perms",
    "groupNameVi": "G-Permutations",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            0,
            1
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          3,
          2,
          5
        ],
        "E": [
          2,
          3,
          3
        ],
        "S": [
          2,
          4,
          5
        ],
        "W": [
          4,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "gd-1",
        "notation": "(R U R') y' (R2 u' R U') (R' U R' u) R2",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "gd-2",
        "notation": "R U R' U' D R2 U' R U' R' U R' U R2 D'",
        "description": "Không dùng rotation"
      }
    ],
    "tags": [
      "g perms",
      "gd",
      "g perm",
      "pll gd"
    ]
  },
  {
    "id": "pll-t",
    "type": "PLL",
    "number": 12,
    "name": "PLL T",
    "aka": [
      "T Perm",
      "T"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          3,
          5
        ],
        "E": [
          2,
          4,
          3
        ],
        "S": [
          2,
          2,
          5
        ],
        "W": [
          4,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "t-1",
        "notation": "(R U R' U') (R' F R2 U') (R' U' R U) (R' F')",
        "isPreferred": true,
        "description": "T Perm quốc dân kinh điển"
      },
      {
        "id": "t-2",
        "notation": "R2 U R2 U' R2 U' D R2 U' R2 U R2 D'",
        "description": "Biến thể 2-gen D"
      },
      {
        "id": "t-mirror",
        "notation": "(L' U' L U) (L F' L2 U) (L U L' U') (L F)",
        "description": "Bản ngược / Mirror (Headlights bên Phải, xoay tay trái)",
        "fingerTrickNotes": "Dùng khi gặp T-Perm bị ngược với Headlights ở bên phải"
      },
      {
        "id": "t-y2",
        "notation": "y2 (R U R' U') (R' F R2 U') (R' U' R U) (R' F') y2",
        "description": "Xoay y2 (hoặc U2) đưa Headlights về bên Trái rồi giải chuẩn"
      }
    ],
    "tags": [
      "t",
      "t perm",
      "pll t",
      "adjacent"
    ]
  },
  {
    "id": "pll-f",
    "type": "PLL",
    "number": 13,
    "name": "PLL F",
    "aka": [
      "F Perm",
      "F"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          2,
          5
        ],
        "E": [
          2,
          5,
          3
        ],
        "S": [
          2,
          3,
          5
        ],
        "W": [
          4,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "f-1",
        "notation": "R' U' F' (R U R' U') (R' F R2 U') (R' U' R U) (R' U R)",
        "isPreferred": true,
        "description": "R' U' F' + T-perm setup"
      },
      {
        "id": "f-2",
        "notation": "(R' U R U' R2' F' U' F U) (R F R' F') R2",
        "description": "Biến thể speedcubing"
      },
      {
        "id": "f-setup",
        "notation": "(R' U' F') (R U R' U') (R' F R2 U') (R' U' R U) (R' U R)",
        "description": "Chuẩn speedcubing: Setup T-Perm (R' U' F' + T-Perm + U R)"
      }
    ],
    "tags": [
      "f",
      "f perm",
      "pll f",
      "adjacent"
    ]
  },
  {
    "id": "pll-ja",
    "type": "PLL",
    "number": 14,
    "name": "PLL Ja",
    "aka": [
      "Ja Perm",
      "Ja",
      "J"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          5,
          5
        ],
        "E": [
          2,
          3,
          3
        ],
        "S": [
          2,
          2,
          5
        ],
        "W": [
          4,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "ja-1",
        "notation": "x R2' F R F' R U2' r' U r U2' x'",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "ja-2",
        "notation": "y' (L' U' L F) (L' U' L U) L F' L2' U L",
        "description": "Biến thể tay trái (Mirror Jb)"
      }
    ],
    "tags": [
      "j",
      "ja",
      "ja perm",
      "pll ja"
    ]
  },
  {
    "id": "pll-jb",
    "type": "PLL",
    "number": 15,
    "name": "PLL Jb",
    "aka": [
      "Jb Perm",
      "Jb",
      "J"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            0,
            2
          ]
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            0
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            0,
            1
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            2,
            0
          ],
          "to": [
            0,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          5,
          5,
          2
        ],
        "E": [
          4,
          4,
          5
        ],
        "S": [
          4,
          2,
          2
        ],
        "W": [
          3,
          3,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "jb-1",
        "notation": "(R U R' F') (R U R' U') R' F R2 U' R'",
        "isPreferred": true,
        "description": "Jb cực nhanh, mượt và phổ biến nhất"
      },
      {
        "id": "jb-2",
        "notation": "R U2 R' U' R U2 L' U R' U' L",
        "description": "Biến thể L-turn"
      }
    ],
    "tags": [
      "j",
      "jb",
      "jb perm",
      "pll jb"
    ]
  },
  {
    "id": "pll-ra",
    "type": "PLL",
    "number": 16,
    "name": "PLL Ra",
    "aka": [
      "Ra Perm",
      "Ra",
      "R"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            0,
            2
          ]
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            0
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            2,
            0
          ],
          "to": [
            0,
            0
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          5,
          3,
          2
        ],
        "E": [
          4,
          2,
          5
        ],
        "S": [
          4,
          4,
          2
        ],
        "W": [
          3,
          5,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "ra-1",
        "notation": "(R U' R' U') (R U R D) (R' U' R D') (R' U2 R')",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "ra-2",
        "notation": "(R U R' F') (R U2' R' U2') (R' F R U) (R U2' R')",
        "description": "Biến thể không có D move"
      }
    ],
    "tags": [
      "r",
      "ra",
      "ra perm",
      "pll ra"
    ]
  },
  {
    "id": "pll-rb",
    "type": "PLL",
    "number": 17,
    "name": "PLL Rb",
    "aka": [
      "Rb Perm",
      "Rb",
      "R"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị liền kề (Adjacent)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            2
          ]
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            2
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            0,
            1
          ]
        },
        {
          "from": [
            1,
            2
          ],
          "to": [
            1,
            0
          ]
        },
        {
          "from": [
            2,
            0
          ],
          "to": [
            0,
            0
          ]
        },
        {
          "from": [
            2,
            2
          ],
          "to": [
            2,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          2,
          5,
          3
        ],
        "E": [
          5,
          4,
          2
        ],
        "S": [
          4,
          2,
          4
        ],
        "W": [
          5,
          3,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "rb-1",
        "notation": "R' U2 R' D' R U' R' D R U R U' R' U' R",
        "isPreferred": true,
        "description": "Chuẩn D-slice"
      },
      {
        "id": "rb-2",
        "notation": "R2 F R (U R U' R') F' (R U2' R' U2' R)",
        "description": "Biến thể F-turn"
      }
    ],
    "tags": [
      "r",
      "rb",
      "rb perm",
      "pll rb"
    ]
  },
  {
    "id": "pll-v",
    "type": "PLL",
    "number": 18,
    "name": "PLL V",
    "aka": [
      "V Perm",
      "V"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị đường chéo (Diagonal)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            0
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ]
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            0,
            1
          ]
        },
        {
          "from": [
            2,
            1
          ],
          "to": [
            1,
            0
          ]
        }
      ],
      "sideColors": {
        "N": [
          4,
          2,
          5
        ],
        "E": [
          2,
          5,
          3
        ],
        "S": [
          4,
          4,
          5
        ],
        "W": [
          2,
          3,
          3
        ]
      }
    },
    "algorithms": [
      {
        "id": "v-1",
        "notation": "(R' U R' U') y (R' F' R2 U') (R' U R' F) R F",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "v-2",
        "notation": "R' U R' U' R D' R' D R' U D' R2 U' R2' D R2",
        "description": "Biến thể không quay cube"
      }
    ],
    "tags": [
      "v",
      "v perm",
      "pll v",
      "diagonal"
    ]
  },
  {
    "id": "pll-y",
    "type": "PLL",
    "number": 19,
    "name": "PLL Y",
    "aka": [
      "Y Perm",
      "Y"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị đường chéo (Diagonal)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            0
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          2,
          4,
          3
        ],
        "E": [
          5,
          5,
          4
        ],
        "S": [
          2,
          2,
          3
        ],
        "W": [
          5,
          3,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "y-1",
        "notation": "F (R U' R' U') (R U R' F') (R U R' U') (R' F R F')",
        "isPreferred": true,
        "description": "F + Sexy đảo + Jb finish"
      },
      {
        "id": "y-2",
        "notation": "R2 U' R' U R U' x' U' R U' R' U' R' U R' x",
        "description": "Biến thể 2-gen"
      }
    ],
    "tags": [
      "y",
      "y perm",
      "pll y",
      "diagonal"
    ]
  },
  {
    "id": "pll-na",
    "type": "PLL",
    "number": 20,
    "name": "PLL Na",
    "aka": [
      "Na Perm",
      "Na",
      "N"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị đường chéo (Diagonal)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            2
          ],
          "to": [
            2,
            0
          ],
          "twoWay": true
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          3,
          2
        ],
        "E": [
          4,
          4,
          5
        ],
        "S": [
          3,
          2,
          2
        ],
        "W": [
          4,
          5,
          5
        ]
      }
    },
    "algorithms": [
      {
        "id": "na-1",
        "notation": "(R U R' U) (R U R' F' R U R' U' R' F R2 U' R') (U2 R U' R')",
        "isPreferred": true,
        "description": "Setup + Jb perm + Undo"
      },
      {
        "id": "na-2",
        "notation": "z (U R' D R2 U' R D')2 z'",
        "description": "Biến thể z-rotation commutator"
      }
    ],
    "tags": [
      "n",
      "na",
      "na perm",
      "pll na",
      "diagonal"
    ]
  },
  {
    "id": "pll-nb",
    "type": "PLL",
    "number": 21,
    "name": "PLL Nb",
    "aka": [
      "Nb Perm",
      "Nb",
      "N"
    ],
    "category": "Other",
    "groupNameVi": "Hoán vị đường chéo (Diagonal)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            0
          ],
          "to": [
            2,
            2
          ],
          "twoWay": true
        },
        {
          "from": [
            1,
            0
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          2,
          3,
          3
        ],
        "E": [
          5,
          4,
          4
        ],
        "S": [
          2,
          2,
          3
        ],
        "W": [
          5,
          5,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "nb-1",
        "notation": "(R' U R U') (R' F' U' F) (R U R' F) (R' F' R U' R)",
        "isPreferred": true,
        "description": "Chuẩn speedcubing"
      },
      {
        "id": "nb-2",
        "notation": "z (D' R U' R2 D R' U)2 z'",
        "description": "Biến thể z-rotation"
      }
    ],
    "tags": [
      "n",
      "nb",
      "nb perm",
      "pll nb",
      "diagonal"
    ]
  },
  {
    "id": "pll-parity-opp",
    "type": "PLL",
    "number": 22,
    "name": "PLL Parity (2 Cạnh đối diện)",
    "aka": [
      "Opposite Edge Parity",
      "PLL Parity 4x4",
      "Parity Đối"
    ],
    "category": "Parity",
    "groupNameVi": "Lỗi Parity (4x4 & Khối chẵn)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            2,
            1
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          2,
          3
        ],
        "E": [
          5,
          5,
          5
        ],
        "S": [
          2,
          3,
          2
        ],
        "W": [
          4,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "parity-opp-1",
        "notation": "r2 U2 r2 Uw2 r2 u2",
        "isPreferred": true,
        "description": "Chuẩn speedcubing 4x4 (Hoán vị 2 cạnh đối)",
        "fingerTrickNotes": "Xoay 2 lớp trong trục R và trục U: r2 U2 r2 Uw2 r2 u2"
      },
      {
        "id": "parity-opp-2",
        "notation": "Rw2 R2 U2 Rw2 R2 Uw2 Rw2 R2 Uw2",
        "description": "Biến thể dùng lớp ngoài kết hợp lớp trong"
      }
    ],
    "tags": [
      "parity",
      "4x4",
      "pll parity",
      "opposite",
      "cạnh đối"
    ]
  },
  {
    "id": "pll-parity-adj",
    "type": "PLL",
    "number": 23,
    "name": "PLL Parity (2 Cạnh kề nhau)",
    "aka": [
      "Adjacent Edge Parity",
      "4x4 Parity Kề"
    ],
    "category": "Parity",
    "groupNameVi": "Lỗi Parity (4x4 & Khối chẵn)",
    "pllPattern": {
      "arrows": [
        {
          "from": [
            0,
            1
          ],
          "to": [
            1,
            2
          ],
          "twoWay": true
        }
      ],
      "sideColors": {
        "N": [
          3,
          5,
          3
        ],
        "E": [
          5,
          3,
          5
        ],
        "S": [
          2,
          2,
          2
        ],
        "W": [
          4,
          4,
          4
        ]
      }
    },
    "algorithms": [
      {
        "id": "parity-adj-1",
        "notation": "(r2 U2 r2 Uw2 r2 u2) + T-Perm",
        "isPreferred": true,
        "description": "Cách nhanh nhất: Làm Parity đối diện rồi xoay T-Perm",
        "fingerTrickNotes": "Hoặc xoay T-Perm trước rồi làm Parity đối diện"
      },
      {
        "id": "parity-adj-2",
        "notation": "R' U R' U' B' R' B2 U' B' U B' R B R (r2 U2 r2 Uw2 r2 u2)",
        "description": "Công thức giải trực tiếp 1 lần không cần xoay T-Perm"
      }
    ],
    "tags": [
      "parity",
      "4x4",
      "adjacent",
      "cạnh kề"
    ]
  }
];
