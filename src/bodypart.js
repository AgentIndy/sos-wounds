const bodyParts = ["Upper Head",
"Face",
"Lower Head",
"Neck",
"Chest",
"Left Shoulder",
"Left Upper Arm",
"Left Elbow",
"Left Forearm",
"Left Hand",
"Right Shoulder",
"Right Upper Arm",
"Right Elbow",
"Right Forearm",
"Right Hand",
"Groin",
"Belly",
"Left Side",
"Right Side",
"Left Hip",
"Right Hip",
"Left Thigh",
"Left Knee",
"Left Shin",
"Left Foot",
"Right Thigh",
"Right Knee",
"Right Shin",
"Right Foot"];

module.exports = {
  /**
   * Returns ID # of a Body Part by name
   */
  getBodyPartbyName: function (input) {
    return bodyParts.findIndex( partName => {
      return partName === input;
    });
  },

  getBodyPartbyId: function(index) {
    return bodyParts[index];
  },
  getAllParts: function () {
    return bodyParts;
  }
}
