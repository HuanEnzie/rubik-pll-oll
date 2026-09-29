/**
 * PLL — 21 case 3x3 + 2 case Parity (chỉ 4x4). Chạy `npm run verify` sau khi sửa.
 * Hình 2D/3D của 21 case được suy ra từ công thức đầu tiên; Parity không mô phỏng được trên 3x3.
 */
import { AlgorithmCase } from '../types';
import { buildPllCase, PllDef } from '../utils/caseBuilder';

const PLL_DEFS: PllDef[] = [
  { key: "Ua", number: 1, aka: ["Ua Perm","Ua"], category: "Edges", groupNameVi: "Hoán vị cạnh (Edges)", algs: [
    "M2 U M U2 M' U M2",
    "R U' R U R U R U' R' U' R2",
  ] },
  { key: "Ub", number: 2, aka: ["Ub Perm","Ub"], category: "Edges", groupNameVi: "Hoán vị cạnh (Edges)", algs: [
    "M2 U' M U2 M' U' M2",
    "R2 U R U R' U' R' U' R' U R'",
  ] },
  { key: "H", number: 3, aka: ["H Perm","H"], category: "Edges", groupNameVi: "Hoán vị cạnh (Edges)", algs: [
    "M2 U M2 U2 M2 U M2",
    "M2 U' M2 U2 M2 U' M2",
  ] },
  { key: "Z", number: 4, aka: ["Z Perm","Z"], category: "Edges", groupNameVi: "Hoán vị cạnh (Edges)", algs: [
    "M' U M2 U M2 U M' U2 M2",
    "M2 U M2 U M' U2 M2 U2 M'",
  ] },
  { key: "Aa", number: 5, aka: ["Aa Perm","Aa"], category: "Corners", groupNameVi: "Hoán vị góc (Corners)", algs: [
    "x R' U R' D2 R U' R' D2 R2 x'",
    "y' x' R2 D2 R' U' R D2 R' U R' x",
  ] },
  { key: "Ab", number: 6, aka: ["Ab Perm","Ab"], category: "Corners", groupNameVi: "Hoán vị góc (Corners)", algs: [
    "x R2 D2 R U R' D2 R U' R x'",
    "x' R U' R D2 R' U R D2 R2 x",
  ] },
  { key: "E", number: 7, aka: ["E Perm","E"], category: "Corners", groupNameVi: "Hoán vị góc (Corners)", algs: [
    "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
  ] },
  { key: "Ga", number: 8, aka: ["Ga Perm","Ga"], category: "G Perms", groupNameVi: "G-Permutations", algs: [
    "R2 U R' U R' U' R U' R2 U' D R' U R D'",
    "R2 U R' U R' U' R U' R2 D U' R' U R D'",
    "R2 u R' U R' U' R u' R2 y' R' U R",
  ] },
  { key: "Gb", number: 9, aka: ["Gb Perm","Gb"], category: "G Perms", groupNameVi: "G-Permutations", algs: [
    "R' U' R U D' R2 U R' U R U' R U' R2 D",
    "R' U' R y R2 u R' U R U' R u' R2",
    "F' U' F R2 u R' U R U' R u' R2",
  ] },
  { key: "Gc", number: 10, aka: ["Gc Perm","Gc"], category: "G Perms", groupNameVi: "G-Permutations", algs: [
    "R2 U' R U' R U R' U R2 U D' R U' R' D",
    "R2 U' R U' R U R' U R2 D' U R U' R' D",
    "y2 R2 u' R U' R U R' u R2 y R U' R'",
  ] },
  { key: "Gd", number: 11, aka: ["Gd Perm","Gd"], category: "G Perms", groupNameVi: "G-Permutations", algs: [
    "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    "R U R' y' R2 u' R U' R' U R' u R2",
  ] },
  { key: "T", number: 12, aka: ["T Perm","T"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "R U R' U' R' F R2 U' R' U' R U R' F'",
    "R2 U R2 U' R2 U' D R2 U' R2 U R2 D'",
    "L' U' L U L F' L2 U L U L' U' L F",
    "y2 R U R' U' R' F R2 U' R' U' R U R' F' y2",
  ] },
  { key: "F", number: 13, aka: ["F Perm","F"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    "R' U R U' R2 F' U' F U R F R' F' R2",
  ] },
  { key: "Ja", number: 14, aka: ["Ja Perm","Ja","J"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "x R2 F R F' R U2 r' U r U2 x'",
    "y' L' U' L F L' U' L U L F' L2 U L",
  ] },
  { key: "Jb", number: 15, aka: ["Jb Perm","Jb","J"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "R U R' F' R U R' U' R' F R2 U' R'",
    "R U2 R' U' R U2 L' U R' U' L",
  ] },
  { key: "Ra", number: 16, aka: ["Ra Perm","Ra","R"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "R U' R' U' R U R D R' U' R D' R' U2 R'",
    "R U R' F' R U2 R' U2 R' F R U R U2 R'",
  ] },
  { key: "Rb", number: 17, aka: ["Rb Perm","Rb","R"], category: "Other", groupNameVi: "Hoán vị liền kề (Adjacent)", algs: [
    "R' U2 R U2 R' F R U R' U' R' F' R2",
    "R' U2 R' D' R U' R' D R U R U' R' U' R",
    "R2 F R U R U' R' F' R U2 R' U2 R",
  ] },
  { key: "V", number: 18, aka: ["V Perm","V"], category: "Other", groupNameVi: "Hoán vị đường chéo (Diagonal)", algs: [
    "R' U R' U' y R' F' R2 U' R' U R' F R F",
    "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2",
  ] },
  { key: "Y", number: 19, aka: ["Y Perm","Y"], category: "Other", groupNameVi: "Hoán vị đường chéo (Diagonal)", algs: [
    "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  ] },
  { key: "Na", number: 20, aka: ["Na Perm","Na","N"], category: "Other", groupNameVi: "Hoán vị đường chéo (Diagonal)", algs: [
    "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
  ] },
  { key: "Nb", number: 21, aka: ["Nb Perm","Nb","N"], category: "Other", groupNameVi: "Hoán vị đường chéo (Diagonal)", algs: [
    "R' U R U' R' F' U' F R U R' F R' F' R U' R",
  ] },
];

// Parity chỉ có trên 4x4 nên không mô phỏng trên khối 3x3; hình vẽ tay.
const PARITY_CASES: AlgorithmCase[] = [
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
    ],
    "simulatable": false
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
    ],
    "simulatable": false
  }
];

export const PLL_CASES: AlgorithmCase[] = [...PLL_DEFS.map(buildPllCase), ...PARITY_CASES];
