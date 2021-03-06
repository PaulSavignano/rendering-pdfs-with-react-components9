import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Documents } from '../documents'
import { Document } from '../../../ui/components/document'
import { generateComponentAsPDF } from '../../../modules/server/generate-pdf'
import { rateLimit } from '../../../modules/rate-limit'

export const downloadDocument = new ValidatedMethod({
  name: 'documents.download',
  validate: new SimpleSchema({
    documentId: { type: String },
  }).validator(),
  run({ documentId }) {
    const document = Documents.findOne({ _id: documentId })
    const fileName = `document_${document._id}.pdf`
    return generateComponentAsPDF({ component: Document, props: { document }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error) })
  },
})

rateLimit({
  methods: [
    downloadDocument,
  ],
  limit: 1,
  timeRange: 1000,
})
