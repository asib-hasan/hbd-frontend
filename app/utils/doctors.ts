export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    availability: string;
    location: string;
    area?: string; // Sub-area within a city
    fee?: string;
    qualifications?: string[];
    isFeatured?: boolean;
    gender?: "male" | "female";
}

// Dhaka areas
export const dhakaAreas = [
    { id: "uttara", name: "Uttara", doctorCount: 28, hospitalCount: 5 },
    { id: "dhanmondi", name: "Dhanmondi", doctorCount: 35, hospitalCount: 8 },
    { id: "mohammadpur", name: "Mohammadpur", doctorCount: 22, hospitalCount: 4 },
    { id: "mohakhali", name: "Mohakhali", doctorCount: 30, hospitalCount: 6 },
    { id: "gulshan", name: "Gulshan", doctorCount: 42, hospitalCount: 10 },
    { id: "banani", name: "Banani", doctorCount: 26, hospitalCount: 5 },
    { id: "mirpur", name: "Mirpur", doctorCount: 38, hospitalCount: 6 },
    { id: "bashundhara", name: "Bashundhara", doctorCount: 20, hospitalCount: 3 },
    { id: "motijheel", name: "Motijheel", doctorCount: 18, hospitalCount: 4 },
    { id: "shyamoli", name: "Shyamoli", doctorCount: 15, hospitalCount: 3 },
    { id: "tejgaon", name: "Tejgaon", doctorCount: 12, hospitalCount: 2 },
    { id: "lalmatia", name: "Lalmatia", doctorCount: 16, hospitalCount: 3 },
];

export const doctors: Doctor[] = [
    // Uttara Doctors
    {
        id: "1",
        name: "Dr. Abdul Karim",
        specialty: "Constitutional Treatment",
        hospital: "Uttara Homeopathy Center",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=faces",
        rating: 4.9,
        reviews: 342,
        experience: "25 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "uttara",
        fee: "800 BDT",
        qualifications: ["BHMS", "DHMS", "MD (Hom)"],
        isFeatured: true,
        gender: "male",
    },
    {
        id: "2",
        name: "Dr. Nusrat Jahan",
        specialty: "Women's Health",
        hospital: "Uttara Natural Healing Clinic",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&crop=faces",
        rating: 4.8,
        reviews: 256,
        experience: "15 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "uttara",
        fee: "600 BDT",
        qualifications: ["BHMS", "MD (Hom)"],
        gender: "female",
    },
    {
        id: "3",
        name: "Dr. Rezaul Karim",
        specialty: "Child Care",
        hospital: "Uttara Homeo Care",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop&crop=faces",
        rating: 4.7,
        reviews: 189,
        experience: "12 Years",
        availability: "Next Available: Tomorrow",
        location: "dhaka",
        area: "uttara",
        fee: "500 BDT",
        qualifications: ["BHMS", "DHMS"],
        gender: "male",
    },
    // Dhanmondi Doctors
    {
        id: "4",
        name: "Dr. Fatema Begum",
        specialty: "Chronic Diseases",
        hospital: "Dhanmondi Homeopathic Hospital",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&crop=faces",
        rating: 4.8,
        reviews: 289,
        experience: "18 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "dhanmondi",
        fee: "700 BDT",
        qualifications: ["BHMS", "FCPS (Hom)", "MD (Hom)"],
        isFeatured: true,
        gender: "female",
    },
    {
        id: "5",
        name: "Dr. Ahsan Habib",
        specialty: "Skin Disorders",
        hospital: "Dhanmondi Natural Cure Center",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=faces",
        rating: 4.9,
        reviews: 312,
        experience: "20 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "dhanmondi",
        fee: "800 BDT",
        qualifications: ["BHMS", "MD (Hom)", "PhD"],
        gender: "male",
    },
    {
        id: "6",
        name: "Dr. Sadia Islam",
        specialty: "Mental Health",
        hospital: "Popular Homeo Clinic, Dhanmondi",
        image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=300&fit=crop&crop=faces",
        rating: 4.8,
        reviews: 178,
        experience: "14 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "dhanmondi",
        fee: "900 BDT",
        qualifications: ["BHMS", "MD (Hom)"],
        gender: "female",
    },
    // All other doctors are omitted for brevity but should be included in real implementation
    // Adding just enough for the layout
    {
        id: "10",
        name: "Dr. Mohammad Hassan",
        specialty: "Neurological Disorders",
        hospital: "National Homeopathic Institute",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=300&fit=crop&crop=faces",
        rating: 4.9,
        reviews: 198,
        experience: "20 Years",
        availability: "Next Available: Tomorrow",
        location: "dhaka",
        area: "mohakhali",
        fee: "1000 BDT",
        qualifications: ["BHMS", "MD (Hom)", "PhD"],
        isFeatured: true,
        gender: "male",
    },
    {
        id: "11",
        name: "Dr. Shafiqur Rahman",
        specialty: "Heart & Circulation",
        hospital: "Mohakhali Homeo Foundation",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop&crop=faces",
        rating: 4.9,
        reviews: 456,
        experience: "28 Years",
        availability: "Available Today",
        location: "dhaka",
        area: "mohakhali",
        fee: "1200 BDT",
        qualifications: ["BHMS", "FCPS (Hom)", "MD (Hom)", "Fellow"],
        isFeatured: true,
        gender: "male",
    }
];

export const getDoctorsByLocation = (location: string): Doctor[] => {
    // Check if it's a Dhaka area
    const isDhakaArea = dhakaAreas.some(area => area.id === location);

    if (isDhakaArea) {
        return doctors.filter(doctor => doctor.area === location);
    }

    if (location === "bangladesh") {
        return doctors;
    }

    return doctors.filter(doctor => doctor.location === location);
};

export const getFeaturedDoctors = (): Doctor[] => {
    return doctors.filter(doctor => doctor.isFeatured);
};

export const getFemaleDoctors = (): Doctor[] => {
    return doctors.filter(doctor => doctor.gender === "female");
};
