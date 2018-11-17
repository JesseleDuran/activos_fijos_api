const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const Post = require;
/**
 * @swagger
 * definitions:
 *   CommunityUser:
 *     type: object
 *     description: this model represents the CommunityUsers relationship
 *     required:
 *       - user
 *       - community
 *       - kind
 *     properties:
 *       id:
 *         type: string
 *         readOnly: true
 *       user:
 *         readOnly: true
 *         type: string
 *       kind:
 *         readOnly: true
 *         type: string
 *         description: who CommunityUser the thing
 *         enum: [SECURITY, RESIDENT, ADMINISTRATOR]
 *       community:
 *         readOnly: true
 *         type: string
 *       reference:
 *         type: string
 *         description: Reference is use to know in what apt or office live the resident
 */

const KINDS = ["SECURITY", "RESIDENT", "ADMINISTRATOR"];
const STATUSES = ["PENDING", "APPROVED"];
const CommunityUserSchema = new Schema({
  kind: {
    type: String,
    enum: KINDS,
    default: "RESIDENT",
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  community: {
    type: Schema.Types.ObjectId,
    ref: "Community",
    required: true
  },
  status: { type: String, enum: STATUSES, default: "PENDING" },
  reference: {
    type: String
  }
});

CommunityUserSchema.statics.findOrCreate = async function findOneOrCreate(
  condition,
  params
) {
  const self = this;
  let u = await self.findOne(condition);
  if (!u) u = await self.create(params);
  await u.save();
  return u;
};

// this is to not repeat CommunityUsers on same posts, companies, jobs etc ..
CommunityUserSchema.index({ user: 1, community: 1 }, { unique: true });
module.exports = mongoose.model("CommunityUser", CommunityUserSchema);
