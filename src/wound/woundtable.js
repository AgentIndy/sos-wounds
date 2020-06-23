const parts = require("./../bodypart.js");

/*
 * wound info from
 * Chart lookup structured like this
 * chart[body part ID - 1][damage type int][wound level - 1] = { wound stats }
 */

class WoundEntry {
  constructor(stun, pain, bleed, special) {
    this.stun = stun;
    this.pain = pain;
    this.bleed = bleed;
    this.special = [];
    if (special.length > 0) {
      this.special = special;
    }
  }
}

// INDY FILL THIS IN

var table = [
[ //upper head
  [ //cutting
    { //level 1
      stun: 0,
      pain: 7,
      bleed: 1,
      special: ["Big fuckies", "From", "McSuckies"]
    },
    { //upper head, cutting, l2
      stun: 2,
      pain: 9,
      bleed: 3,
      special: []
    },
    { //upper head, cutting, l3
      stun: 4,
      pain: 13,
      bleed: 5,
      special: []
    },
    { //upper head, cutting, l4
      stun: "total",
      pain: "total",
      bleed: 8,
      special: []
    },
    { //upper head, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //upper head, piercing, l2
      stun: 1,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //upper head, piercing, l3
      stun: 2,
      pain: 10,
      bleed: 5,
      special: []
    },
    { //upper head, piercing, l4
      stun: "total",
      pain: "total",
      bleed: 20,
      special: []
    },
    { //upper head, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //upper head, bludgeoning, l2
      stun: 3,
      pain: 6,
      bleed: 2,
      special: []
    },
    { //upper head, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 4,
      special: []
    },
    { //upper head, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 6,
      special: []
    },
    { //upper head, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper head, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper head, unarmed, l3
      stun: 1,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //upper head, unarmed, l4
      stun: 3,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //upper head, unarmed, l5
      stun: "total",
      pain: 10,
      bleed: 3,
      special: []
    }
  ]
],
[ //face
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 1,
      special: []
    },
    { //face, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 3,
      special: []
    },
    { //face, cutting, l3
      stun: 4,
      pain: 16,
      bleed: 8,
      special: []
    },
    { //face, cutting, l4
      stun: 6,
      pain: 20,
      bleed: 18,
      special: []
    },
    { //face, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ]
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //face, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 2,
      special: []
    },
    { //face, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 3,
      special: []
    },
    { //face, piercing, l4
      stun: 5,
      pain: 15,
      bleed: 10,
      special: []
    },
    { //face, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //face, bludgeoning, l2
      stun: 3,
      pain: 5,
      bleed: 2,
      special: []
    },
    { //face, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 3,
      special: []
    },
    { //face, bludgeoning, l4
      stun: 7,
      pain: 12,
      bleed: 7,
      special: []
    },
    { //face, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ]
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //face, unarmed, l2
      stun: 2,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //face, unarmed, l3
      stun: 3,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //face, unarmed, l4
      stun: 4,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //face, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: []
    }
  ]
],
[ //lower head
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 1,
      special: []
    },
    { //lower head, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 4,
      special: []
    },
    { //lower head, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 8,
      special: []
    },
    { //lower head, cutting, l4
      stun: 4,
      pain: 18,
      bleed: 12,
      special: []
    },
    { //lower head, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ]
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 2,
      special: []
    },
    { //lower head, piercing, l2
      stun: 1,
      pain: 6,
      bleed: 4,
      special: []
    },
    { //lower head, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 8,
      special: []
    },
    { //lower head, piercing, l4
      stun: 3,
      pain: 14,
      bleed: 14,
      special: []
    },
    { //lower head, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //lower head, bludgeoning, l2
      stun: 4,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //lower head, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //lower head, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 4,
      special: []
    },
    { //lower head, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ]
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //lower head, unarmed, l2
      stun: 3,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //lower head, unarmed, l3
      stun: 5,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //lower head, unarmed, l4
      stun: 10,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //lower head, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: []
    }
  ]
],
[ //neck
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 4,
      special: []
    },
    { //neck, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 6,
      special: []
    },
    { //neck, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 12,
      special: []
    },
    { //neck, cutting, l4
      stun: 5,
      pain: 14,
      bleed: 20,
      special: []
    },
    { //neck, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 6,
      special: []
    },
    { //neck, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 10,
      special: []
    },
    { //neck, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 20,
      special: []
    },
    { //neck, piercing, l4
      stun: 5,
      pain: 12,
      bleed: 25,
      special: []
    },
    { //neck, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ]
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //neck, bludgeoning, l2
      stun: 4,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //neck, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //neck, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 7,
      special: []
    },
    { //neck, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //neck, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //neck, unarmed, l3
      stun: 3,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //neck, unarmed, l4
      stun: 5,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //neck, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: []
    }
  ]
],
[ //shoulder
  [ //cutting
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //shoulder, cutting, l2
      stun: 0,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //shoulder, cutting, l3
      stun: 1,
      pain: 12,
      bleed: 6,
      special: []
    },
    { //shoulder, cutting, l4
      stun: 2,
      pain: 14,
      bleed: 8,
      special: []
    },
    { //shoulder, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 3,
      bleed: 2,
      special: []
    },
    { //shoulder, piercing, l2
      stun: 0,
      pain: 5,
      bleed: 5,
      special: []
    },
    { //shoulder, piercing, l3
      stun: 1,
      pain: 9,
      bleed: 7,
      special: []
    },
    { //shoulder, piercing, l4
      stun: 2,
      pain: 12,
      bleed: 12,
      special: []
    },
    { //shoulder, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 20,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //shoulder, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 2,
      special: []
    },
    { //shoulder, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 4,
      special: []
    },
    { //shoulder, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 5,
      special: []
    },
    { //shoulder, bludgeoning, l5
      stun: 12,
      pain: 15,
      bleed: 12,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //shoulder, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //shoulder, unarmed, l3
      stun: 1,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //shoulder, unarmed, l4
      stun: 2,
      pain: 8,
      bleed: 0,
      special: []
    },
    { //shoulder, unarmed, l5
      stun: 8,
      pain: 18,
      bleed: 0,
      special: []
    }
  ]
],
[ //chest
  [ //cutting
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //chest, cutting, l2
      stun: 1,
      pain: 5,
      bleed: 2,
      special: []
    },
    { //chest, cutting, l3
      stun: 2,
      pain: 10,
      bleed: 5,
      special: []
    },
    { //chest, cutting, l4
      stun: 3,
      pain: 15,
      bleed: 20,
      special: []
    },
    { //chest, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 3,
      bleed: 2,
      special: []
    },
    { //chest, piercing, l2
      stun: 1,
      pain: 4,
      bleed: 4,
      special: []
    },
    { //chest, piercing, l3
      stun: 3,
      pain: 7,
      bleed: 6,
      special: []
    },
    { //chest, piercing, l4
      stun: 4,
      pain: 14,
      bleed: 25,
      special: []
    },
    { //chest, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //chest, bludgeoning, l2
      stun: 2,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //chest, bludgeoning, l3
      stun: 3,
      pain: 8,
      bleed: 0,
      special: []
    },
    { //chest, bludgeoning, l4
      stun: 5,
      pain: 12,
      bleed: 8,
      special: []
    },
    { //chest, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 15,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //chest, unarmed, l2
      stun: 0,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //chest, unarmed, l3
      stun: 1,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //chest, unarmed, l4
      stun: 2,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //chest, unarmed, l5
      stun: 3,
      pain: 15,
      bleed: 5,
      special: []
    }
  ]
],
[ //side
  [ //cutting
    { //level 1
      stun: 0,
      pain: 6,
      bleed: 2,
      special: []
    },
    { //side, cutting, l2
      stun: 1,
      pain: 7,
      bleed: 4,
      special: []
    },
    { //side, cutting, l3
      stun: 2,
      pain: 12,
      bleed: 6,
      special: []
    },
    { //side, cutting, l4
      stun: 3,
      pain: 20,
      bleed: 20,
      special: []
    },
    { //side, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 4,
      special: []
    },
    { //side, piercing, l2
      stun: 1,
      pain: 5,
      bleed: 6,
      special: []
    },
    { //side, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 9,
      special: []
    },
    { //side, piercing, l4
      stun: 3,
      pain: 12,
      bleed: 14,
      special: []
    },
    { //side, piercing, l5
      stun: 5,
      pain: 16,
      bleed: 18,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //side, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //side, bludgeoning, l3
      stun: 6,
      pain: 7,
      bleed: 1,
      special: []
    },
    { //side, bludgeoning, l4
      stun: 8,
      pain: 12,
      bleed: 5,
      special: []
    },
    { //side, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 25,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //side, unarmed, l2
      stun: 1,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //side, unarmed, l3
      stun: 8,
      pain: 8,
      bleed: 0,
      special: []
    },
    { //side, unarmed, l4
      stun: 15,
      pain: 10,
      bleed: 0,
      special: []
    },
    { //side, unarmed, l5
      stun: 20,
      pain: 15,
      bleed: 3,
      special: []
    }
  ]
],
[ //belly
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //belly, cutting, l2
      stun: 3,
      pain: 8,
      bleed: 4,
      special: []
    },
    { //belly, cutting, l3
      stun: 4,
      pain: 10,
      bleed: 10,
      special: []
    },
    { //belly, cutting, l4
      stun: 5,
      pain: 15,
      bleed: 15,
      special: []
    },
    { //belly, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 3,
      special: []
    },
    { //belly, piercing, l2
      stun: 3,
      pain: 6,
      bleed: 6,
      special: []
    },
    { //belly, piercing, l3
      stun: 5,
      pain: 12,
      bleed: 10,
      special: []
    },
    { //belly, piercing, l4
      stun: 7,
      pain: 14,
      bleed: 20,
      special: []
    },
    { //belly, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 3,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //belly, bludgeoning, l2
      stun: 6,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //belly, bludgeoning, l3
      stun: 9,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //belly, bludgeoning, l4
      stun: 11,
      pain: 7,
      bleed: 3,
      special: []
    },
    { //belly, bludgeoning, l5
      stun: 15,
      pain: 8,
      bleed: 3,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //belly, unarmed, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //belly, unarmed, l3
      stun: 5,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //belly, unarmed, l4
      stun: 7,
      pain: 7,
      bleed: 0,
      special: []
    },
    { //belly, unarmed, l5
      stun: 9,
      pain: 12,
      bleed: 3,
      special: []
    }
  ]
],
[ //hip
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //hip, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 2,
      special: []
    },
    { //hip, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 5,
      special: []
    },
    { //hip, cutting, l4
      stun: 4,
      pain: 16,
      bleed: 10,
      special: []
    },
    { //hip, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //hip, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //hip, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 6,
      special: []
    },
    { //hip, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: []
    },
    { //hip, piercing, l5
      stun: 5,
      pain: 14,
      bleed: 12,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //hip, bludgeoning, l2
      stun: 3,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //hip, bludgeoning, l3
      stun: 5,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //hip, bludgeoning, l4
      stun: 6,
      pain: 12,
      bleed: 5,
      special: []
    },
    { //hip, bludgeoning, l5
      stun: 8,
      pain: 18,
      bleed: 7,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //hip, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //hip, unarmed, l3
      stun: 1,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //hip, unarmed, l4
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //hip, unarmed, l5
      stun: 3,
      pain: 6,
      bleed: 0,
      special: []
    }
  ]
],
[ //groin
  [ //cutting
    { //level 1
      stun: 2,
      pain: 6,
      bleed: 2,
      special: []
    },
    { //groin, cutting, l2
      stun: 3,
      pain: 9,
      bleed: 5,
      special: []
    },
    { //groin, cutting, l3
      stun: 5,
      pain: 15,
      bleed: 8,
      special: []
    },
    { //groin, cutting, l4
      stun: "total",
      pain: "total",
      bleed: 20,
      special: []
    },
    { //groin, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 2,
      pain: 5,
      bleed: 4,
      special: []
    },
    { //groin, piercing, l2
      stun: 3,
      pain: 7,
      bleed: 8,
      special: []
    },
    { //groin, piercing, l3
      stun: 4,
      pain: 12,
      bleed: 15,
      special: []
    },
    { //groin, piercing, l4
      stun: "total",
      pain: "total",
      bleed: 25,
      special: []
    },
    { //groin, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //groin, bludgeoning, l2
      stun: 6,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //groin, bludgeoning, l3
      stun: 8,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //groin, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 8,
      special: []
    },
    { //groin, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 15,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //groin, unarmed, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //groin, unarmed, l3
      stun: 6,
      pain: 8,
      bleed: 0,
      special: []
    },
    { //groin, unarmed, l4
      stun: 8,
      pain: 12,
      bleed: 0,
      special: []
    },
    { //groin, unarmed, l5
      stun: "total",
      pain: "total",
      bleed: 3,
      special: []
    }
  ]
],
[ //thigh
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: []
    },
    { //thigh, cutting, l2
      stun: 3,
      pain: 5,
      bleed: 4,
      special: []
    },
    { //thigh, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 10,
      special: []
    },
    { //thigh, cutting, l4
      stun: 4,
      pain: 15,
      bleed: 20,
      special: []
    },
    { //thigh, cutting, l5
      stun: "total",
      pain: "total",
      bleed: 25,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 4,
      special: []
    },
    { //thigh, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 6,
      special: []
    },
    { //thigh, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 10,
      special: []
    },
    { //thigh, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 15,
      special: []
    },
    { //thigh, piercing, l5
      stun: 5,
      pain: 14,
      bleed: 20,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //thigh, bludgeoning, l2
      stun: 4,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //thigh, bludgeoning, l3
      stun: 6,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //thigh, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //thigh, bludgeoning, l5
      stun: 10,
      pain: 20,
      bleed: 5,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //thigh, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //thigh, unarmed, l3
      stun: 0,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //thigh, unarmed, l4
      stun: 1,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //thigh, unarmed, l5
      stun: 2,
      pain: 10,
      bleed: 3,
      special: []
    }
  ]
],
[ //knee
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //knee, cutting, l2
      stun: 1,
      pain: 8,
      bleed: 1,
      special: []
    },
    { //knee, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 2,
      special: []
    },
    { //knee, cutting, l4
      stun: 5,
      pain: 15,
      bleed: 3,
      special: []
    },
    { //knee, cutting, l5
      stun: "total",
      pain: "total",
      bleed: 20,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 2,
      special: []
    },
    { //knee, piercing, l2
      stun: 1,
      pain: 7,
      bleed: 4,
      special: []
    },
    { //knee, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 7,
      special: []
    },
    { //knee, piercing, l4
      stun: 3,
      pain: 16,
      bleed: 12,
      special: []
    },
    { //knee, piercing, l5
      stun: 8,
      pain: 20,
      bleed: 15,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //knee, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //knee, bludgeoning, l3
      stun: 6,
      pain: 7,
      bleed: 2,
      special: []
    },
    { //knee, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //knee, bludgeoning, l5
      stun: "total",
      pain: 18,
      bleed: 5,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //knee, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //knee, unarmed, l3
      stun: 2,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //knee, unarmed, l4
      stun: 3,
      pain: 10,
      bleed: 0,
      special: []
    },
    { //knee, unarmed, l5
      stun: 8,
      pain: 18,
      bleed: 0,
      special: []
    }
  ]
],
[ //shin
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //shin, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 4,
      special: []
    },
    { //shin, cutting, l3
      stun: 3,
      pain: 9,
      bleed: 7,
      special: []
    },
    { //shin, cutting, l4
      stun: 4,
      pain: 14,
      bleed: 10,
      special: []
    },
    { //shin, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 15,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: []
    },
    { //shin, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 5,
      special: []
    },
    { //shin, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 8,
      special: []
    },
    { //shin, piercing, l4
      stun: 4,
      pain: 10,
      bleed: 10,
      special: []
    },
    { //shin, piercing, l5
      stun: 5,
      pain: 20,
      bleed: 17,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //shin, bludgeoning, l2
      stun: 3,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //shin, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 3,
      special: []
    },
    { //shin, bludgeoning, l4
      stun: 7,
      pain: 14,
      bleed: 5,
      special: []
    },
    { //shin, bludgeoning, l5
      stun: 9,
      pain: 16,
      bleed: 10,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //shin, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //shin, unarmed, l3
      stun: 2,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //shin, unarmed, l4
      stun: 3,
      pain: 8,
      bleed: 0,
      special: []
    },
    { //shin, unarmed, l5
      stun: 6,
      pain: 14,
      bleed: 0,
      special: []
    }
  ]
],
[ //foot
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //foot, cutting, l2
      stun: 2,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //foot, cutting, l3
      stun: 3,
      pain: 6,
      bleed: 1,
      special: []
    },
    { //foot, cutting, l4
      stun: 4,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //foot, cutting, l5
      stun: 5,
      pain: 12,
      bleed: 10,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: []
    },
    { //foot, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 3,
      special: []
    },
    { //foot, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 4,
      special: []
    },
    { //foot, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 5,
      special: []
    },
    { //foot, piercing, l5
      stun: 5,
      pain: 18,
      bleed: 7,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //foot, bludgeoning, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //foot, bludgeoning, l3
      stun: 5,
      pain: 7,
      bleed: 2,
      special: []
    },
    { //foot, bludgeoning, l4
      stun: 7,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //foot, bludgeoning, l5
      stun: 9,
      pain: 18,
      bleed: 5,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //foot, unarmed, l2
      stun: 0,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //foot, unarmed, l3
      stun: 1,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //foot, unarmed, l4
      stun: 2,
      pain: 7,
      bleed: 0,
      special: []
    },
    { //foot, unarmed, l5
      stun: 3,
      pain: 10,
      bleed: 0,
      special: []
    }
  ]
],
[ //upper arm
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //upper arm, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 2,
      special: []
    },
    { //upper arm, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //upper arm, cutting, l4
      stun: 4,
      pain: 14,
      bleed: 6,
      special: []
    },
    { //upper arm, cutting, l5
      stun: 5,
      pain: 15,
      bleed: 20,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: []
    },
    { //upper arm, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 3,
      special: []
    },
    { //upper arm, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 5,
      special: []
    },
    { //upper arm, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: []
    },
    { //upper arm, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 15,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //upper arm, bludgeoning, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //upper arm, bludgeoning, l3
      stun: 5,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //upper arm, bludgeoning, l4
      stun: 7,
      pain: 9,
      bleed: 2,
      special: []
    },
    { //upper arm, bludgeoning, l5
      stun: 9,
      pain: 12,
      bleed: 5,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper arm, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper arm, unarmed, l3
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //upper arm, unarmed, l4
      stun: 3,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //upper arm, unarmed, l5
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    }
  ]
],
[ //elbow
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //elbow, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //elbow, cutting, l3
      stun: 3,
      pain: 8,
      bleed: 5,
      special: []
    },
    { //elbow, cutting, l4
      stun: 4,
      pain: 12,
      bleed: 7,
      special: []
    },
    { //elbow, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 3,
      special: []
    },
    { //elbow, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 6,
      special: []
    },
    { //elbow, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 10,
      special: []
    },
    { //elbow, piercing, l4
      stun: 4,
      pain: 14,
      bleed: 14,
      special: []
    },
    { //elbow, piercing, l5
      stun: 5,
      pain: 18,
      bleed: 20,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //elbow, bludgeoning, l2
      stun: 4,
      pain: 6,
      bleed: 0,
      special: []
    },
    { //elbow, bludgeoning, l3
      stun: 6,
      pain: 10,
      bleed: 1,
      special: []
    },
    { //elbow, bludgeoning, l4
      stun: 8,
      pain: 14,
      bleed: 3,
      special: []
    },
    { //elbow, bludgeoning, l5
      stun: 10,
      pain: 18,
      bleed: 6,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //elbow, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //elbow, unarmed, l3
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //elbow, unarmed, l4
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //elbow, unarmed, l5
      stun: 3,
      pain: 5,
      bleed: 0,
      special: []
    }
  ]
],
[ //forearm
  [ //cutting
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 1,
      special: []
    },
    { //forearm, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //forearm, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 6,
      special: []
    },
    { //forearm, cutting, l4
      stun: 4,
      pain: 15,
      bleed: 8,
      special: []
    },
    { //forearm, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: []
    },
    { //forearm, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 5,
      special: []
    },
    { //forearm, piercing, l3
      stun: 3,
      pain: 7,
      bleed: 10,
      special: []
    },
    { //forearm, piercing, l4
      stun: 4,
      pain: 9,
      bleed: 14,
      special: []
    },
    { //forearm, piercing, l5
      stun: 5,
      pain: 12,
      bleed: 18,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //forearm, bludgeoning, l2
      stun: 4,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //forearm, bludgeoning, l3
      stun: 6,
      pain: 10,
      bleed: 3,
      special: []
    },
    { //forearm, bludgeoning, l4
      stun: 8,
      pain: 14,
      bleed: 6,
      special: []
    },
    { //forearm, bludgeoning, l5
      stun: 10,
      pain: 15,
      bleed: 10,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //forearm, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //forearm, unarmed, l3
      stun: 2,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //forearm, unarmed, l4
      stun: 3,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //forearm, unarmed, l5
      stun: 5,
      pain: 8,
      bleed: 3,
      special: []
    }
  ]
],
[ //hand
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: []
    },
    { //hand, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: []
    },
    { //hand, cutting, l3
      stun: 3,
      pain: 9,
      bleed: 5,
      special: []
    },
    { //hand, cutting, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: []
    },
    { //hand, cutting, l5
      stun: 5,
      pain: 15,
      bleed: 15,
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 1,
      special: []
    },
    { //hand, piercing, l2
      stun: 2,
      pain: 4,
      bleed: 2,
      special: []
    },
    { //hand, piercing, l3
      stun: 3,
      pain: 6,
      bleed: 4,
      special: []
    },
    { //hand, piercing, l4
      stun: 4,
      pain: 10,
      bleed: 14,
      special: []
    },
    { //hand, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 18,
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 1,
      special: []
    },
    { //hand, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 2,
      special: []
    },
    { //hand, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 2,
      special: []
    },
    { //hand, bludgeoning, l4
      stun: 8,
      pain: 8,
      bleed: 3,
      special: []
    },
    { //hand, bludgeoning, l5
      stun: 10,
      pain: 12,
      bleed: 8,
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //hand, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //hand, unarmed, l3
      stun: 2,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //hand, unarmed, l4
      stun: 5,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //hand, unarmed, l5
      stun: 10,
      pain: 10,
      bleed: 0,
      special: []
    }
  ]
],
[ //upper back
  [ //cutting
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: []
    },
    { //upper back, cutting, l2
      stun: 3,
      pain: 8,
      bleed: 4,
      special: []
    },
    { //upper back, cutting, l3
      stun: 4,
      pain: 12,
      bleed: 6,
      special: []
    },
    { //upper back, cutting, l4
      stun: 8,
      pain: 20,
      bleed: 10,
      special: []
    },
    { //upper back, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 2,
      special: []
    },
    { //upper back, piercing, l2
      stun: 3,
      pain: 4,
      bleed: 4,
      special: []
    },
    { //upper back, piercing, l3
      stun: 5,
      pain: 9,
      bleed: 8,
      special: []
    },
    { //upper back, piercing, l4
      stun: 7,
      pain: 13,
      bleed: 20,
      special: []
    },
    { //upper back, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //upper back, bludgeoning, l2
      stun: 5,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //upper back, bludgeoning, l3
      stun: 9,
      pain: 8,
      bleed: 2,
      special: []
    },
    { //upper back, bludgeoning, l4
      stun: 11,
      pain: 12,
      bleed: 3,
      special: []
    },
    { //upper back, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper back, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: []
    },
    { //upper back, unarmed, l3
      stun: 3,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //upper back, unarmed, l4
      stun: 5,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //upper back, unarmed, l5
      stun: 10,
      pain: 5,
      bleed: 0,
      special: []
    }
  ]
],
[ //lower back
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: []
    },
    { //lower back, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 5,
      special: []
    },
    { //lower back, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 7,
      special: []
    },
    { //lower back, cutting, l4
      stun: 8,
      pain: 15,
      bleed: 15,
      special: []
    },
    { //lower back, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 3,
      special: []
    },
    { //lower back, piercing, l2
      stun: 3,
      pain: 4,
      bleed: 6,
      special: []
    },
    { //lower back, piercing, l3
      stun: 4,
      pain: 10,
      bleed: 10,
      special: []
    },
    { //lower back, piercing, l4
      stun: 7,
      pain: 12,
      bleed: 20,
      special: []
    },
    { //lower back, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //lower back, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: []
    },
    { //lower back, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 1,
      special: []
    },
    { //lower back, bludgeoning, l4
      stun: 10,
      pain: 7,
      bleed: 3,
      special: []
    },
    { //lower back, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: []
    }
  ],
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 1,
      bleed: 0,
      special: []
    },
    { //lower back, unarmed, l2
      stun: 3,
      pain: 2,
      bleed: 0,
      special: []
    },
    { //lower back, unarmed, l3
      stun: 6,
      pain: 3,
      bleed: 0,
      special: []
    },
    { //lower back, unarmed, l4
      stun: 8,
      pain: 4,
      bleed: 0,
      special: []
    },
    { //lower back, unarmed, l5
      stun: 10,
      pain: 5,
      bleed: 1,
      special: []
    }
  ]
]
];

//INDY STOP HERE



function woundLookup(bodyPart, damageType, woundLevel) {
  let bodyPartId = parts.getBodyPartbyName(bodyPart);
  return table[bodyPartId][damageType][woundLevel - 1];
}

module.exports = woundLookup;
