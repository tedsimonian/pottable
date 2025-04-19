
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  expiresAt: 'expiresAt',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  userId: 'userId'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  providerId: 'providerId',
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  idToken: 'idToken',
  accessTokenExpiresAt: 'accessTokenExpiresAt',
  refreshTokenExpiresAt: 'refreshTokenExpiresAt',
  scope: 'scope',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  value: 'value',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GardenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  location: 'location',
  sizeSqFeet: 'sizeSqFeet',
  gardenType: 'gardenType',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GardenConditionScalarFieldEnum = {
  id: 'id',
  gardenId: 'gardenId',
  climateZone: 'climateZone',
  sunlightExposure: 'sunlightExposure',
  avgTemperatureF: 'avgTemperatureF',
  humidityPct: 'humidityPct',
  soilType: 'soilType',
  annualRainfall: 'annualRainfall',
  additionalNotes: 'additionalNotes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContainerTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  typicalDimensions: 'typicalDimensions'
};

exports.Prisma.ContainerScalarFieldEnum = {
  id: 'id',
  gardenId: 'gardenId',
  containerTypeId: 'containerTypeId',
  name: 'name',
  material: 'material',
  widthInches: 'widthInches',
  lengthInches: 'lengthInches',
  heightInches: 'heightInches',
  diameterInches: 'diameterInches',
  volumeGallons: 'volumeGallons',
  positionX: 'positionX',
  positionY: 'positionY',
  soilType: 'soilType',
  drainageQuality: 'drainageQuality',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlantCatalogScalarFieldEnum = {
  id: 'id',
  commonName: 'commonName',
  scientificName: 'scientificName',
  plantType: 'plantType',
  lifeCycle: 'lifeCycle',
  growthHabit: 'growthHabit',
  edible: 'edible',
  description: 'description',
  plantingInstructions: 'plantingInstructions',
  careInstructions: 'careInstructions',
  daysToGerminationMin: 'daysToGerminationMin',
  daysToGerminationMax: 'daysToGerminationMax',
  daysToMaturityMin: 'daysToMaturityMin',
  daysToMaturityMax: 'daysToMaturityMax',
  harvestSeason: 'harvestSeason',
  heightInchesMin: 'heightInchesMin',
  heightInchesMax: 'heightInchesMax',
  widthInchesMin: 'widthInchesMin',
  widthInchesMax: 'widthInchesMax',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlantGrowingConditionScalarFieldEnum = {
  id: 'id',
  plantId: 'plantId',
  minTemperatureF: 'minTemperatureF',
  maxTemperatureF: 'maxTemperatureF',
  sunlightNeeds: 'sunlightNeeds',
  waterNeeds: 'waterNeeds',
  soilPhMin: 'soilPhMin',
  soilPhMax: 'soilPhMax',
  soilTypePreference: 'soilTypePreference',
  fertilizerNeeds: 'fertilizerNeeds',
  spacingInches: 'spacingInches',
  containerSuitable: 'containerSuitable',
  minContainerDepthInches: 'minContainerDepthInches',
  minContainerVolumeGallons: 'minContainerVolumeGallons'
};

exports.Prisma.PlantClimateZoneScalarFieldEnum = {
  id: 'id',
  plantId: 'plantId',
  climateZone: 'climateZone',
  notes: 'notes'
};

exports.Prisma.PlantVarietyScalarFieldEnum = {
  id: 'id',
  plantId: 'plantId',
  varietyName: 'varietyName',
  description: 'description',
  specificTraits: 'specificTraits',
  specificCareNeeds: 'specificCareNeeds',
  imageUrl: 'imageUrl'
};

exports.Prisma.PlantCompanionScalarFieldEnum = {
  id: 'id',
  plantId: 'plantId',
  companionPlantId: 'companionPlantId',
  relationshipType: 'relationshipType',
  effectDescription: 'effectDescription'
};

exports.Prisma.ContainerPlantScalarFieldEnum = {
  id: 'id',
  containerId: 'containerId',
  plantId: 'plantId',
  varietyId: 'varietyId',
  quantity: 'quantity',
  plantDate: 'plantDate',
  initialStage: 'initialStage',
  currentStage: 'currentStage',
  status: 'status',
  positionX: 'positionX',
  positionY: 'positionY',
  expectedHarvestDate: 'expectedHarvestDate',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlantGrowthStageScalarFieldEnum = {
  id: 'id',
  containerPlantId: 'containerPlantId',
  stageName: 'stageName',
  startDate: 'startDate',
  endDate: 'endDate',
  notes: 'notes',
  imageUrl: 'imageUrl'
};

exports.Prisma.ActionTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category'
};

exports.Prisma.GardenActionScalarFieldEnum = {
  id: 'id',
  actionTypeId: 'actionTypeId',
  userId: 'userId',
  gardenId: 'gardenId',
  containerId: 'containerId',
  containerPlantId: 'containerPlantId',
  actionDate: 'actionDate',
  quantity: 'quantity',
  unit: 'unit',
  notes: 'notes',
  successRating: 'successRating',
  createdAt: 'createdAt'
};

exports.Prisma.HarvestScalarFieldEnum = {
  id: 'id',
  containerPlantId: 'containerPlantId',
  harvestDate: 'harvestDate',
  quantity: 'quantity',
  unit: 'unit',
  qualityRating: 'qualityRating',
  notes: 'notes',
  imageUrl: 'imageUrl'
};

exports.Prisma.ContainerHistoryScalarFieldEnum = {
  id: 'id',
  containerId: 'containerId',
  previousContainerId: 'previousContainerId',
  previousGardenId: 'previousGardenId',
  newGardenId: 'newGardenId',
  moveDate: 'moveDate',
  reason: 'reason'
};

exports.Prisma.PlantMovementHistoryScalarFieldEnum = {
  id: 'id',
  containerPlantId: 'containerPlantId',
  previousContainerId: 'previousContainerId',
  newContainerId: 'newContainerId',
  moveDate: 'moveDate',
  reason: 'reason',
  plantConditionBefore: 'plantConditionBefore',
  plantConditionAfter: 'plantConditionAfter'
};

exports.Prisma.SeasonalPlanScalarFieldEnum = {
  id: 'id',
  gardenId: 'gardenId',
  season: 'season',
  year: 'year',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlannedPlantingScalarFieldEnum = {
  id: 'id',
  planId: 'planId',
  containerId: 'containerId',
  plantId: 'plantId',
  varietyId: 'varietyId',
  plannedDate: 'plannedDate',
  quantity: 'quantity',
  notes: 'notes',
  status: 'status'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'status',
  category: 'category',
  priority: 'priority',
  difficulty: 'difficulty',
  estimatedMinutes: 'estimatedMinutes',
  startDate: 'startDate',
  endDate: 'endDate',
  dateCompleted: 'dateCompleted',
  userId: 'userId',
  gardenId: 'gardenId',
  containerId: 'containerId',
  containerPlantId: 'containerPlantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isRecurring: 'isRecurring',
  parentTaskId: 'parentTaskId'
};

exports.Prisma.TaskPrerequisiteScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  prerequisiteTaskId: 'prerequisiteTaskId',
  createdAt: 'createdAt'
};

exports.Prisma.TaskNoteScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskCompletionLogScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  status: 'status',
  completedAt: 'completedAt',
  notes: 'notes',
  percentDone: 'percentDone',
  timeSpentMinutes: 'timeSpentMinutes'
};

exports.Prisma.RecurringTaskPatternScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  frequency: 'frequency',
  interval: 'interval',
  endAfterCount: 'endAfterCount',
  endByDate: 'endByDate',
  daysOfWeek: 'daysOfWeek',
  dayOfMonth: 'dayOfMonth',
  monthOfYear: 'monthOfYear',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskNotificationScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  userId: 'userId',
  message: 'message',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  Account: 'Account',
  Verification: 'Verification',
  Garden: 'Garden',
  GardenCondition: 'GardenCondition',
  ContainerType: 'ContainerType',
  Container: 'Container',
  PlantCatalog: 'PlantCatalog',
  PlantGrowingCondition: 'PlantGrowingCondition',
  PlantClimateZone: 'PlantClimateZone',
  PlantVariety: 'PlantVariety',
  PlantCompanion: 'PlantCompanion',
  ContainerPlant: 'ContainerPlant',
  PlantGrowthStage: 'PlantGrowthStage',
  ActionType: 'ActionType',
  GardenAction: 'GardenAction',
  Harvest: 'Harvest',
  ContainerHistory: 'ContainerHistory',
  PlantMovementHistory: 'PlantMovementHistory',
  SeasonalPlan: 'SeasonalPlan',
  PlannedPlanting: 'PlannedPlanting',
  Task: 'Task',
  TaskPrerequisite: 'TaskPrerequisite',
  TaskNote: 'TaskNote',
  TaskCompletionLog: 'TaskCompletionLog',
  RecurringTaskPattern: 'RecurringTaskPattern',
  TaskNotification: 'TaskNotification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
