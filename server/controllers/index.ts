import generalConfig from '../config';
const wbEdit = require('wikibase-edit')(generalConfig)

wbEdit.label.set({
  id: 'Q494',
  language: 'fr',
  value: 'Bac à sable bulgroz'
})

wbEdit.description.set({
  id: 'Q494',
  language: 'fr',
  value: 'description du Bac à sable bulgroz'
})

wbEdit.entity.edit({
  id: 'Q494',
  labels: {
    ar: 'باراك أوباما',
    fr: null
  },
  descriptions: {
    ar: 'الرئيس الرابع والأربعون للولايات المتحدة الأمريكية',
    fr: null
  },
  aliases: {
    en: [ 'Barack Hussein Obama II', 'Barack Obama II', 'Barack Hussein Obama', 'Obama' ],
    ar: ['باراك حسين أوباما','باراك حسين أوباما الثاني','أوباما'],
    nl: [
      { value: 'bul', add: true },
      { value: 'groz', add: true },
    ],
  },
  summary: 'Gave an Arabic label',
})