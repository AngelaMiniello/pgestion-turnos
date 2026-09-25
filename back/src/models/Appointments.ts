const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ["especialidad", "practica"]
    },
    especialidad: {
        type: String,
        required: function() { return (this as any).tipo === "especialidad"; }
    },
    practica: {
        type: String,
        required: function() { return (this as any).tipo === "practica"; }
    },
    medico: {
        type: String,
        required: function() { return (this as any).tipo === "especialidad"; }
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "cancelled"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default module.exports = mongoose.model("Appointment", appointmentSchema);
