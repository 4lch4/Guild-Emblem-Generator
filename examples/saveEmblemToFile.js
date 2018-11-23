const EmblemGenerator = require('guild-emblem-generator')
const modifier = new EmblemGenerator.Modifier()

const testGuild = {
  'lastModified': 1512863169000,
  'name': 'Precognition',
  'realm': 'Balnazzar',
  'battlegroup': 'Ruin',
  'level': 25,
  'side': 1,
  'achievementPoints': 1575,
  'emblem': {
    'icon': 97,
    'iconColor': 'ff101517',
    'iconColorId': 15,
    'border': 0,
    'borderColor': 'ff0f1415',
    'borderColorId': 15,
    'backgroundColor': 'ffffffff',
    'backgroundColorId': 49
  }
}

const testEmblem = {
  'icon': 97,
  'iconColor': 'ff101517',
  'iconColorId': 15,
  'border': 0,
  'borderColor': 'ff0f1415',
  'borderColorId': 15,
  'backgroundColor': 'ffffffff',
  'backgroundColorId': 49
}

// If you wish to use a guild object, the modifier class can clean up the object
modifier.getEmblemFromGuildObject(testGuild).then(cleanEmblem => {
  EmblemGenerator.saveEmblemToFile(cleanEmblem, testGuild.side, `${testGuild.name}.png`).then(() => {
    console.log(`File saved!`)
  }).catch(err => console.error(err))
})

// If you wish to use the emblem object, simply pass in the faction id
EmblemGenerator.saveEmblemToFile(testEmblem, 1, 'Precognition.png').then(() => {
  console.log(`File saved!`)
}).catch(err => console.error(err))
