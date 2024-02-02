import { create } from 'zustand'

export const usePatientStore = create((set, get) => ({
  patient: {},
  patients: [],
  addPatientData: (patient) => {
    set((state) => ({
      patients: [
        ...state.patients,
        { index: get().patients.length + 1, data: patient },
      ],
    }))
  },
}))
