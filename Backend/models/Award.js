const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Scholarship', 'Bursary', 'Grant', 'Prize', 'Award', 'Emergency Fund', 'Emergency Support', 'Employment', 'Fellowship', 'Waiver'],
        required: true
    },
    university: {
        type: String,
        required: false // Some awards might be provincial/national
    },
    amount: {
        type: mongoose.Schema.Types.Mixed, // Can be Number or String (e.g., "Variable")
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    eligibility: {
        campus: [String],
        requiredYear: [Number],
        requiredFaculty: [String],
        minGPA: Number,
        citizenshipRequired: [String],
        indigenousOnly: Boolean,
        hasDisability: Boolean,
        gender: [String],
        financialNeed: Boolean,
        studentLoanRequired: Boolean,
        affiliation: String,
        schoolDistrict: String,
        partTimeEligible: Boolean,
        formerYouthInCare: Boolean
    },
    requiredDocumentation: [String],
    applicationDeadline: String,
    sourceUrl: String,
    notificationSubscribers: [{
        email: String,
        subscribedAt: {
            type: Date,
            default: Date.now
        }
    }],
    applicationStatus: {
        isOpen: Boolean,
        opensOn: Date,
        closesOn: Date,
        lastChecked: Date
    }
}, {
    timestamps: true
});

// Indexes for common queries
awardSchema.index({ 'eligibility.campus': 1 });
awardSchema.index({ 'eligibility.requiredYear': 1 });
awardSchema.index({ 'eligibility.minGPA': 1 });
awardSchema.index({ category: 1 });

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
