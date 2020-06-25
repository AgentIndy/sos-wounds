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
      special: ["-"],
      description: "Shallow cut on scalp. Not serious."
    },
    { //upper head, cutting, l2
      stun: 2,
      pain: 9,
      bleed: 3,
      special: ["-"],
      description: "Deep cut on scalp. Blood runs into face."
    },
    { //upper head, cutting, l3
      stun: 4,
      pain: 13,
      bleed: 5,
      special: ["KO vs 4 RS"],
      description: "Cracked skull. Nearly invisible cut, but devastating."
    },
    { //upper head, cutting, l4
      stun: "total",
      pain: "total",
      bleed: 8,
      special: ["Auto-KO", "Miracle Surgery vs Brain Damage", "Internal Bleeding"],
      description: "Severe skull fracture. Brain damage. Unconscious."
    },
    { //upper head, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description: "Blade cleaves through the skull. Dead."
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 0,
      special: ["-"],
      description: "Raking glance to the side of the head."
    },
    { //upper head, piercing, l2
      stun: 1,
      pain: 6,
      bleed: 3,
      special: ["-"],
      description: "Deeper rake across the scalp. Lots of blood."
    },
    { //upper head, piercing, l3
      stun: 2,
      pain: 10,
      bleed: 5,
      special: ["KO vs 3 RS"],
      description: "Skull cracked. May lose consciousness."
    },
    { //upper head, piercing, l4
      stun: "total",
      pain: "total",
      bleed: 20,
      special: ["Auto-KO", "Surgery vs Brain Damage", "Internal Bleeding"]
    },
    { //upper head, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description: ["Point penetrates straight through skull. Dead."]
      
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: ["-"],
      description: "Blow to the side of the head. Oww."
    },
    { //upper head, bludgeoning, l2
      stun: 3,
      pain: 6,
      bleed: 2,
      special: ["KO vs 1 RS"],
      description: "Temple is glanced. May lose consciousness."
    },
    { //upper head, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 4,
      special: ["KO vs 5 RS"],
      description: "Skull fracture. May lose consciousness."
    },
    { //upper head, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 6,
      special: ["Auto-KO", "Surgery vs Brain Damage", "Internal Bleeding"],
      description:"Skull shatters. Unconscious."
    },
    { //upper head, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description:"Skull crushed. Brain and bone everywhere. Dead."
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: ["-"],
      description:"Blow to the forehead. Negligible effect."
    },
    { //upper head, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: ["-"],
      description:"Slight graze. Painful."
    },
    { //upper head, unarmed, l3
      stun: 1,
      pain: 1,
      bleed: 0,
      special: ["KO vs 1 RS"],
      description:"Hard blow. May lose consciousness."
    },
    { //upper head, unarmed, l4
      stun: 3,
      pain: 3,
      bleed: 0,
      special: ["KO vs 3 RS"],
      description:"Straight blow to temple. Probably unconscious."
    },
    { //upper head, unarmed, l5
      stun: "total",
      pain: 10,
      bleed: 3,
      special: ["Auto-KO", "Internal Bleeding"],
      description:"Fracturing blow to temple. Possible brain damage."
    }
  ]
],
[ //face
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 1,
      special: ["-"],
      description:"Cut across the chin or lips. May leave a scar."
    },
    { //face, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 3,
      special: ["-"],
      description: "Deeper cut that will scar chin, lip, cheek, or brow."
    },
    { //face, cutting, l3
      stun: 4,
      pain: 16,
      bleed: 8,
      special: ["Surgery vs One-Eyed"],
      description:"Slash catches eye! Severe damage. May lose eye."
    },
    { //face, cutting, l4
      stun: 6,
      pain: 20,
      bleed: 18,
      special: ["Surgery vs One-Eyed OR FacialDeformity", "Infection +2"],
      description: "Face bisected, extreme damage to jaw, teeth, and skull. May lose eye (1-5) or nose (6-10)."
    },
    { //face, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description:"Head cloven through to the teeth. Dead."
    }
  ]
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: ["-"],
      description:"Facial scratch."
    },
    { //face, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 2,
      special: ["-"],
      description:"Point glances facial bones. Mild bleeding."
    },
    { //face, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 3,
      special: ["-"],
      description:"Point hits, but fails to penetrate facial bone."
    },
    { //face, piercing, l4
      stun: 5,
      pain: 15,
      bleed: 10,
      special: ["Surgery vs Mute OR One-Eyed OR +5 bleed"],
      description:"Point penetrates through mouth (1-3) eye (4-6) or facial bones (7-10.) Lots of bleeding, very painful."
    },
    { //face, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description:"Head impaled. Dead."
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: ["-"],
      description:"Blow to the jaw, head rolls with it well."
    },
    { //face, bludgeoning, l2
      stun: 3,
      pain: 5,
      bleed: 2,
      special: ["-"],
      description:"Firmer blow, blood in mouth, may lose tooth."
    },
    { //face, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 3,
      special: ["KO vs 3 RS"],
      description:"Serious damage to jaw, may lose consciousness."
    },
    { //face, bludgeoning, l4
      stun: 7,
      pain: 12,
      bleed: 7,
      special: ["KO vs 5 RS", "Mute until healed"],
      description:"Broken jaw, almost certainly unconscious."
    },
    { //face, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: ["Dead"],
      description:"Jaw smashed, skull shattered, neck broken. Dead."
    }
  ]
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: ["-"],
      description:"Grazing blow."
    },
    { //face, unarmed, l2
      stun: 2,
      pain: 0,
      bleed: 0,
      special: ["-"],
      description:"Firmer blow, might leave a bruise."
    },
    { //face, unarmed, l3
      stun: 3,
      pain: 2,
      bleed: 0,
      special: ["KO vs 2 RS"],
      description:"Hard hit, and swelling! May lose consciousness."
    },
    { //face, unarmed, l4
      stun: 4,
      pain: 10,
      bleed: 3,
      special: ["KO vs 5 RS"],
      description:"Broken nose or eye socket. Probably unconscious."
    },
    { //face, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: ["Auto-KO"],
      description:"Perfect hit. broken nose, lost teeth. Unconscious."
    }
  ]
],
[ //lower head
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 1,
      special: [],
      description:""
    },
    { //lower head, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 4,
      special: [],
      description:""
    },
    { //lower head, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    },
    { //lower head, cutting, l4
      stun: 4,
      pain: 18,
      bleed: 12,
      special: [],
      description:""
    },
    { //lower head, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ]
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 2,
      special: [],
      description:""
    },
    { //lower head, piercing, l2
      stun: 1,
      pain: 6,
      bleed: 4,
      special: [],
      description:""
    },
    { //lower head, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 8,
      special: [],
      description:""
    },
    { //lower head, piercing, l4
      stun: 3,
      pain: 14,
      bleed: 14,
      special: [],
      description:""
    },
    { //lower head, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower head, bludgeoning, l2
      stun: 4,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //lower head, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //lower head, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 4,
      special: [],
      description:""
    },
    { //lower head, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ]
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower head, unarmed, l2
      stun: 3,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower head, unarmed, l3
      stun: 5,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower head, unarmed, l4
      stun: 10,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower head, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //neck
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 4,
      special: [],
      description:""
    },
    { //neck, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 6,
      special: [],
      description:""
    },
    { //neck, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 12,
      special: [],
      description:""
    },
    { //neck, cutting, l4
      stun: 5,
      pain: 14,
      bleed: 20,
      special: [],
      description:""
    },
    { //neck, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 6,
      special: [],
      description:""
    },
    { //neck, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 10,
      special: [],
      description:""
    },
    { //neck, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 20,
      special: [],
      description:""
    },
    { //neck, piercing, l4
      stun: 5,
      pain: 12,
      bleed: 25,
      special: [],
      description:""
    },
    { //neck, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ]
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, bludgeoning, l2
      stun: 4,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //neck, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 7,
      special: [],
      description:""
    },
    { //neck, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, unarmed, l3
      stun: 3,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, unarmed, l4
      stun: 5,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //neck, unarmed, l5
      stun: "total",
      pain: 15,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //shoulder
  [ //cutting
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //shoulder, cutting, l2
      stun: 0,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //shoulder, cutting, l3
      stun: 1,
      pain: 12,
      bleed: 6,
      special: [],
      description:""
    },
    { //shoulder, cutting, l4
      stun: 2,
      pain: 14,
      bleed: 8,
      special: [],
      description:""
    },
    { //shoulder, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 3,
      bleed: 2,
      special: [],
      description:""
    },
    { //shoulder, piercing, l2
      stun: 0,
      pain: 5,
      bleed: 5,
      special: [],
      description:""
    },
    { //shoulder, piercing, l3
      stun: 1,
      pain: 9,
      bleed: 7,
      special: [],
      description:""
    },
    { //shoulder, piercing, l4
      stun: 2,
      pain: 12,
      bleed: 12,
      special: [],
      description:""
    },
    { //shoulder, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //shoulder, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 2,
      special: [],
      description:""
    },
    { //shoulder, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 4,
      special: [],
      description:""
    },
    { //shoulder, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 5,
      special: [],
      description:""
    },
    { //shoulder, bludgeoning, l5
      stun: 12,
      pain: 15,
      bleed: 12,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //shoulder, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //shoulder, unarmed, l3
      stun: 1,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //shoulder, unarmed, l4
      stun: 2,
      pain: 8,
      bleed: 0,
      special: [],
      description:""
    },
    { //shoulder, unarmed, l5
      stun: 8,
      pain: 18,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //chest
  [ //cutting
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, cutting, l2
      stun: 1,
      pain: 5,
      bleed: 2,
      special: [],
      description:""
    },
    { //chest, cutting, l3
      stun: 2,
      pain: 10,
      bleed: 5,
      special: [],
      description:""
    },
    { //chest, cutting, l4
      stun: 3,
      pain: 15,
      bleed: 20,
      special: [],
      description:""
    },
    { //chest, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 3,
      bleed: 2,
      special: [],
      description:""
    },
    { //chest, piercing, l2
      stun: 1,
      pain: 4,
      bleed: 4,
      special: [],
      description:""
    },
    { //chest, piercing, l3
      stun: 3,
      pain: 7,
      bleed: 6,
      special: [],
      description:""
    },
    { //chest, piercing, l4
      stun: 4,
      pain: 14,
      bleed: 25,
      special: [],
      description:""
    },
    { //chest, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, bludgeoning, l2
      stun: 2,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, bludgeoning, l3
      stun: 3,
      pain: 8,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, bludgeoning, l4
      stun: 5,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    },
    { //chest, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, unarmed, l2
      stun: 0,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, unarmed, l3
      stun: 1,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, unarmed, l4
      stun: 2,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //chest, unarmed, l5
      stun: 3,
      pain: 15,
      bleed: 5,
      special: [],
      description:""
    }
  ]
],
[ //side
  [ //cutting
    { //level 1
      stun: 0,
      pain: 6,
      bleed: 2,
      special: [],
      description:""
    },
    { //side, cutting, l2
      stun: 1,
      pain: 7,
      bleed: 4,
      special: [],
      description:""
    },
    { //side, cutting, l3
      stun: 2,
      pain: 12,
      bleed: 6,
      special: [],
      description:""
    },
    { //side, cutting, l4
      stun: 3,
      pain: 20,
      bleed: 20,
      special: [],
      description:""
    },
    { //side, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 0,
      pain: 4,
      bleed: 4,
      special: [],
      description:""
    },
    { //side, piercing, l2
      stun: 1,
      pain: 5,
      bleed: 6,
      special: [],
      description:""
    },
    { //side, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 9,
      special: [],
      description:""
    },
    { //side, piercing, l4
      stun: 3,
      pain: 12,
      bleed: 14,
      special: [],
      description:""
    },
    { //side, piercing, l5
      stun: 5,
      pain: 16,
      bleed: 18,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, bludgeoning, l3
      stun: 6,
      pain: 7,
      bleed: 1,
      special: [],
      description:""
    },
    { //side, bludgeoning, l4
      stun: 8,
      pain: 12,
      bleed: 5,
      special: [],
      description:""
    },
    { //side, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 25,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, unarmed, l2
      stun: 1,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, unarmed, l3
      stun: 8,
      pain: 8,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, unarmed, l4
      stun: 15,
      pain: 10,
      bleed: 0,
      special: [],
      description:""
    },
    { //side, unarmed, l5
      stun: 20,
      pain: 15,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //belly
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //belly, cutting, l2
      stun: 3,
      pain: 8,
      bleed: 4,
      special: [],
      description:""
    },
    { //belly, cutting, l3
      stun: 4,
      pain: 10,
      bleed: 10,
      special: [],
      description:""
    },
    { //belly, cutting, l4
      stun: 5,
      pain: 15,
      bleed: 15,
      special: [],
      description:""
    },
    { //belly, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 3,
      special: [],
      description:""
    },
    { //belly, piercing, l2
      stun: 3,
      pain: 6,
      bleed: 6,
      special: [],
      description:""
    },
    { //belly, piercing, l3
      stun: 5,
      pain: 12,
      bleed: 10,
      special: [],
      description:""
    },
    { //belly, piercing, l4
      stun: 7,
      pain: 14,
      bleed: 20,
      special: [],
      description:""
    },
    { //belly, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 3,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, bludgeoning, l2
      stun: 6,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, bludgeoning, l3
      stun: 9,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, bludgeoning, l4
      stun: 11,
      pain: 7,
      bleed: 3,
      special: [],
      description:""
    },
    { //belly, bludgeoning, l5
      stun: 15,
      pain: 8,
      bleed: 3,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, unarmed, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, unarmed, l3
      stun: 5,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, unarmed, l4
      stun: 7,
      pain: 7,
      bleed: 0,
      special: [],
      description:""
    },
    { //belly, unarmed, l5
      stun: 9,
      pain: 12,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //hip
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //hip, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 2,
      special: [],
      description:""
    },
    { //hip, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 5,
      special: [],
      description:""
    },
    { //hip, cutting, l4
      stun: 4,
      pain: 16,
      bleed: 10,
      special: [],
      description:""
    },
    { //hip, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //hip, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //hip, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 6,
      special: [],
      description:""
    },
    { //hip, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    },
    { //hip, piercing, l5
      stun: 5,
      pain: 14,
      bleed: 12,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //hip, bludgeoning, l2
      stun: 3,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //hip, bludgeoning, l3
      stun: 5,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //hip, bludgeoning, l4
      stun: 6,
      pain: 12,
      bleed: 5,
      special: [],
      description:""
    },
    { //hip, bludgeoning, l5
      stun: 8,
      pain: 18,
      bleed: 7,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //hip, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //hip, unarmed, l3
      stun: 1,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //hip, unarmed, l4
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //hip, unarmed, l5
      stun: 3,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //groin
  [ //cutting
    { //level 1
      stun: 2,
      pain: 6,
      bleed: 2,
      special: [],
      description:""
    },
    { //groin, cutting, l2
      stun: 3,
      pain: 9,
      bleed: 5,
      special: [],
      description:""
    },
    { //groin, cutting, l3
      stun: 5,
      pain: 15,
      bleed: 8,
      special: [],
      description:""
    },
    { //groin, cutting, l4
      stun: "total",
      pain: "total",
      bleed: 20,
      special: [],
      description:""
    },
    { //groin, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 2,
      pain: 5,
      bleed: 4,
      special: [],
      description:""
    },
    { //groin, piercing, l2
      stun: 3,
      pain: 7,
      bleed: 8,
      special: [],
      description:""
    },
    { //groin, piercing, l3
      stun: 4,
      pain: 12,
      bleed: 15,
      special: [],
      description:""
    },
    { //groin, piercing, l4
      stun: "total",
      pain: "total",
      bleed: 25,
      special: [],
      description:""
    },
    { //groin, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, bludgeoning, l2
      stun: 6,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, bludgeoning, l3
      stun: 8,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //groin, bludgeoning, l4
      stun: "total",
      pain: "total",
      bleed: 8,
      special: [],
      description:""
    },
    { //groin, bludgeoning, l5
      stun: "total",
      pain: "total",
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, unarmed, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, unarmed, l3
      stun: 6,
      pain: 8,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, unarmed, l4
      stun: 8,
      pain: 12,
      bleed: 0,
      special: [],
      description:""
    },
    { //groin, unarmed, l5
      stun: "total",
      pain: "total",
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //thigh
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: [],
      description:""
    },
    { //thigh, cutting, l2
      stun: 3,
      pain: 5,
      bleed: 4,
      special: [],
      description:""
    },
    { //thigh, cutting, l3
      stun: 3,
      pain: 12,
      bleed: 10,
      special: [],
      description:""
    },
    { //thigh, cutting, l4
      stun: 4,
      pain: 15,
      bleed: 20,
      special: [],
      description:""
    },
    { //thigh, cutting, l5
      stun: "total",
      pain: "total",
      bleed: 25,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 4,
      special: [],
      description:""
    },
    { //thigh, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 6,
      special: [],
      description:""
    },
    { //thigh, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 10,
      special: [],
      description:""
    },
    { //thigh, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 15,
      special: [],
      description:""
    },
    { //thigh, piercing, l5
      stun: 5,
      pain: 14,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, bludgeoning, l2
      stun: 4,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, bludgeoning, l3
      stun: 6,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //thigh, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //thigh, bludgeoning, l5
      stun: 10,
      pain: 20,
      bleed: 5,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, unarmed, l3
      stun: 0,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, unarmed, l4
      stun: 1,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //thigh, unarmed, l5
      stun: 2,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //knee
  [ //cutting
    { //level 1
      stun: 1,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, cutting, l2
      stun: 1,
      pain: 8,
      bleed: 1,
      special: [],
      description:""
    },
    { //knee, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 2,
      special: [],
      description:""
    },
    { //knee, cutting, l4
      stun: 5,
      pain: 15,
      bleed: 3,
      special: [],
      description:""
    },
    { //knee, cutting, l5
      stun: "total",
      pain: "total",
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 2,
      special: [],
      description:""
    },
    { //knee, piercing, l2
      stun: 1,
      pain: 7,
      bleed: 4,
      special: [],
      description:""
    },
    { //knee, piercing, l3
      stun: 2,
      pain: 9,
      bleed: 7,
      special: [],
      description:""
    },
    { //knee, piercing, l4
      stun: 3,
      pain: 16,
      bleed: 12,
      special: [],
      description:""
    },
    { //knee, piercing, l5
      stun: 8,
      pain: 20,
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, bludgeoning, l3
      stun: 6,
      pain: 7,
      bleed: 2,
      special: [],
      description:""
    },
    { //knee, bludgeoning, l4
      stun: 8,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //knee, bludgeoning, l5
      stun: "total",
      pain: 18,
      bleed: 5,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, unarmed, l3
      stun: 2,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, unarmed, l4
      stun: 3,
      pain: 10,
      bleed: 0,
      special: [],
      description:""
    },
    { //knee, unarmed, l5
      stun: 8,
      pain: 18,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //shin
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //shin, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 4,
      special: [],
      description:""
    },
    { //shin, cutting, l3
      stun: 3,
      pain: 9,
      bleed: 7,
      special: [],
      description:""
    },
    { //shin, cutting, l4
      stun: 4,
      pain: 14,
      bleed: 10,
      special: [],
      description:""
    },
    { //shin, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: [],
      description:""
    },
    { //shin, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 5,
      special: [],
      description:""
    },
    { //shin, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 8,
      special: [],
      description:""
    },
    { //shin, piercing, l4
      stun: 4,
      pain: 10,
      bleed: 10,
      special: [],
      description:""
    },
    { //shin, piercing, l5
      stun: 5,
      pain: 20,
      bleed: 17,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, bludgeoning, l2
      stun: 3,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, bludgeoning, l3
      stun: 5,
      pain: 8,
      bleed: 3,
      special: [],
      description:""
    },
    { //shin, bludgeoning, l4
      stun: 7,
      pain: 14,
      bleed: 5,
      special: [],
      description:""
    },
    { //shin, bludgeoning, l5
      stun: 9,
      pain: 16,
      bleed: 10,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, unarmed, l3
      stun: 2,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, unarmed, l4
      stun: 3,
      pain: 8,
      bleed: 0,
      special: [],
      description:""
    },
    { //shin, unarmed, l5
      stun: 6,
      pain: 14,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //foot
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, cutting, l2
      stun: 2,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //foot, cutting, l3
      stun: 3,
      pain: 6,
      bleed: 1,
      special: [],
      description:""
    },
    { //foot, cutting, l4
      stun: 4,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //foot, cutting, l5
      stun: 5,
      pain: 12,
      bleed: 10,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: [],
      description:""
    },
    { //foot, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 3,
      special: [],
      description:""
    },
    { //foot, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 4,
      special: [],
      description:""
    },
    { //foot, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 5,
      special: [],
      description:""
    },
    { //foot, piercing, l5
      stun: 5,
      pain: 18,
      bleed: 7,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, bludgeoning, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, bludgeoning, l3
      stun: 5,
      pain: 7,
      bleed: 2,
      special: [],
      description:""
    },
    { //foot, bludgeoning, l4
      stun: 7,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //foot, bludgeoning, l5
      stun: 9,
      pain: 18,
      bleed: 5,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, unarmed, l2
      stun: 0,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, unarmed, l3
      stun: 1,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, unarmed, l4
      stun: 2,
      pain: 7,
      bleed: 0,
      special: [],
      description:""
    },
    { //foot, unarmed, l5
      stun: 3,
      pain: 10,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //upper arm
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //upper arm, cutting, l2
      stun: 2,
      pain: 7,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper arm, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //upper arm, cutting, l4
      stun: 4,
      pain: 14,
      bleed: 6,
      special: [],
      description:""
    },
    { //upper arm, cutting, l5
      stun: 5,
      pain: 15,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper arm, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 3,
      special: [],
      description:""
    },
    { //upper arm, piercing, l3
      stun: 3,
      pain: 8,
      bleed: 5,
      special: [],
      description:""
    },
    { //upper arm, piercing, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    },
    { //upper arm, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, bludgeoning, l2
      stun: 3,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, bludgeoning, l3
      stun: 5,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //upper arm, bludgeoning, l4
      stun: 7,
      pain: 9,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper arm, bludgeoning, l5
      stun: 9,
      pain: 12,
      bleed: 5,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, unarmed, l3
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, unarmed, l4
      stun: 3,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper arm, unarmed, l5
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //elbow
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //elbow, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //elbow, cutting, l3
      stun: 3,
      pain: 8,
      bleed: 5,
      special: [],
      description:""
    },
    { //elbow, cutting, l4
      stun: 4,
      pain: 12,
      bleed: 7,
      special: [],
      description:""
    },
    { //elbow, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 3,
      special: [],
      description:""
    },
    { //elbow, piercing, l2
      stun: 2,
      pain: 6,
      bleed: 6,
      special: [],
      description:""
    },
    { //elbow, piercing, l3
      stun: 3,
      pain: 10,
      bleed: 10,
      special: [],
      description:""
    },
    { //elbow, piercing, l4
      stun: 4,
      pain: 14,
      bleed: 14,
      special: [],
      description:""
    },
    { //elbow, piercing, l5
      stun: 5,
      pain: 18,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, bludgeoning, l2
      stun: 4,
      pain: 6,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, bludgeoning, l3
      stun: 6,
      pain: 10,
      bleed: 1,
      special: [],
      description:""
    },
    { //elbow, bludgeoning, l4
      stun: 8,
      pain: 14,
      bleed: 3,
      special: [],
      description:""
    },
    { //elbow, bludgeoning, l5
      stun: 10,
      pain: 18,
      bleed: 6,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, unarmed, l3
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, unarmed, l4
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //elbow, unarmed, l5
      stun: 3,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //forearm
  [ //cutting
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 1,
      special: [],
      description:""
    },
    { //forearm, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //forearm, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 6,
      special: [],
      description:""
    },
    { //forearm, cutting, l4
      stun: 4,
      pain: 15,
      bleed: 8,
      special: [],
      description:""
    },
    { //forearm, cutting, l5
      stun: 5,
      pain: 20,
      bleed: 20,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: [],
      description:""
    },
    { //forearm, piercing, l2
      stun: 2,
      pain: 5,
      bleed: 5,
      special: [],
      description:""
    },
    { //forearm, piercing, l3
      stun: 3,
      pain: 7,
      bleed: 10,
      special: [],
      description:""
    },
    { //forearm, piercing, l4
      stun: 4,
      pain: 9,
      bleed: 14,
      special: [],
      description:""
    },
    { //forearm, piercing, l5
      stun: 5,
      pain: 12,
      bleed: 18,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //forearm, bludgeoning, l2
      stun: 4,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //forearm, bludgeoning, l3
      stun: 6,
      pain: 10,
      bleed: 3,
      special: [],
      description:""
    },
    { //forearm, bludgeoning, l4
      stun: 8,
      pain: 14,
      bleed: 6,
      special: [],
      description:""
    },
    { //forearm, bludgeoning, l5
      stun: 10,
      pain: 15,
      bleed: 10,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //forearm, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //forearm, unarmed, l3
      stun: 2,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //forearm, unarmed, l4
      stun: 3,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //forearm, unarmed, l5
      stun: 5,
      pain: 8,
      bleed: 3,
      special: [],
      description:""
    }
  ]
],
[ //hand
  [ //cutting
    { //level 1
      stun: 1,
      pain: 4,
      bleed: 1,
      special: [],
      description:""
    },
    { //hand, cutting, l2
      stun: 2,
      pain: 6,
      bleed: 3,
      special: [],
      description:""
    },
    { //hand, cutting, l3
      stun: 3,
      pain: 9,
      bleed: 5,
      special: [],
      description:""
    },
    { //hand, cutting, l4
      stun: 4,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    },
    { //hand, cutting, l5
      stun: 5,
      pain: 15,
      bleed: 15,
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 1,
      special: [],
      description:""
    },
    { //hand, piercing, l2
      stun: 2,
      pain: 4,
      bleed: 2,
      special: [],
      description:""
    },
    { //hand, piercing, l3
      stun: 3,
      pain: 6,
      bleed: 4,
      special: [],
      description:""
    },
    { //hand, piercing, l4
      stun: 4,
      pain: 10,
      bleed: 14,
      special: [],
      description:""
    },
    { //hand, piercing, l5
      stun: 5,
      pain: 15,
      bleed: 18,
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 3,
      bleed: 1,
      special: [],
      description:""
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
      special: [],
      description:""
    },
    { //hand, bludgeoning, l4
      stun: 8,
      pain: 8,
      bleed: 3,
      special: [],
      description:""
    },
    { //hand, bludgeoning, l5
      stun: 10,
      pain: 12,
      bleed: 8,
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //hand, unarmed, l2
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //hand, unarmed, l3
      stun: 2,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //hand, unarmed, l4
      stun: 5,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //hand, unarmed, l5
      stun: 10,
      pain: 10,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //upper back
  [ //cutting
    { //level 1
      stun: 1,
      pain: 2,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper back, cutting, l2
      stun: 3,
      pain: 8,
      bleed: 4,
      special: [],
      description:""
    },
    { //upper back, cutting, l3
      stun: 4,
      pain: 12,
      bleed: 6,
      special: [],
      description:""
    },
    { //upper back, cutting, l4
      stun: 8,
      pain: 20,
      bleed: 10,
      special: [],
      description:""
    },
    { //upper back, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 3,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper back, piercing, l2
      stun: 3,
      pain: 4,
      bleed: 4,
      special: [],
      description:""
    },
    { //upper back, piercing, l3
      stun: 5,
      pain: 9,
      bleed: 8,
      special: [],
      description:""
    },
    { //upper back, piercing, l4
      stun: 7,
      pain: 13,
      bleed: 20,
      special: [],
      description:""
    },
    { //upper back, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper back, bludgeoning, l2
      stun: 5,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //upper back, bludgeoning, l3
      stun: 9,
      pain: 8,
      bleed: 2,
      special: [],
      description:""
    },
    { //upper back, bludgeoning, l4
      stun: 11,
      pain: 12,
      bleed: 3,
      special: [],
      description:""
    },
    { //upper back, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 0,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper back, unarmed, l2
      stun: 1,
      pain: 0,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper back, unarmed, l3
      stun: 3,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper back, unarmed, l4
      stun: 5,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //upper back, unarmed, l5
      stun: 10,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    }
  ]
],
[ //lower back
  [ //cutting
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
    },
    { //lower back, cutting, l2
      stun: 2,
      pain: 8,
      bleed: 5,
      special: [],
      description:""
    },
    { //lower back, cutting, l3
      stun: 3,
      pain: 10,
      bleed: 7,
      special: [],
      description:""
    },
    { //lower back, cutting, l4
      stun: 8,
      pain: 15,
      bleed: 15,
      special: [],
      description:""
    },
    { //lower back, cutting, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //piercing
    { //level 1
      stun: 1,
      pain: 5,
      bleed: 3,
      special: [],
      description:""
    },
    { //lower back, piercing, l2
      stun: 3,
      pain: 4,
      bleed: 6,
      special: [],
      description:""
    },
    { //lower back, piercing, l3
      stun: 4,
      pain: 10,
      bleed: 10,
      special: [],
      description:""
    },
    { //lower back, piercing, l4
      stun: 7,
      pain: 12,
      bleed: 20,
      special: [],
      description:""
    },
    { //lower back, piercing, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //bludgeoning
    { //level 1
      stun: 2,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, bludgeoning, l2
      stun: 4,
      pain: 5,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, bludgeoning, l3
      stun: 6,
      pain: 6,
      bleed: 1,
      special: [],
      description:""
    },
    { //lower back, bludgeoning, l4
      stun: 10,
      pain: 7,
      bleed: 3,
      special: [],
      description:""
    },
    { //lower back, bludgeoning, l5
      stun: "dead",
      pain: "dead",
      bleed: "dead",
      special: [],
      description:""
    }
  ],
  [ //unarmed
    { //level 1
      stun: 2,
      pain: 1,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, unarmed, l2
      stun: 3,
      pain: 2,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, unarmed, l3
      stun: 6,
      pain: 3,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, unarmed, l4
      stun: 8,
      pain: 4,
      bleed: 0,
      special: [],
      description:""
    },
    { //lower back, unarmed, l5
      stun: 10,
      pain: 5,
      bleed: 1,
      special: [],
      description:""
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
