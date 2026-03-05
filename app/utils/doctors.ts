export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    chamber_name?: string | null;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    availability: string;
    doctor_status?: string;
    location: string;
    area?: string; // Sub-area within a city
    fee?: string;
    degree_name?: string | null;
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
        degree_name: "BHMS, DHMS, MD (Hom)",
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
        degree_name: "BHMS, MD (Hom)",
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
        degree_name: "BHMS, DHMS",
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
        degree_name: "BHMS, FCPS (Hom), MD (Hom)",
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
        degree_name: "BHMS, MD (Hom), PhD",
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
        degree_name: "BHMS, MD (Hom)",
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
        degree_name: "BHMS, MD (Hom), PhD",
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
        degree_name: "BHMS, FCPS (Hom), MD (Hom), Fellow",
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

export const districts = [
    { id: "all", name: "All Districts" },
    { id: "dhaka", name: "Dhaka" },
    { id: "chittagong", name: "Chittagong" },
    { id: "sylhet", name: "Sylhet" },
    { id: "rajshahi", name: "Rajshahi" },
    { id: "khulna", name: "Khulna" },
];

export const locationInfo: Record<string, {
    title: string;
    description: string;
    doctorCount: number;
    hospitalCount: number
}> = {
    bangladesh: {
        title: "Best Homeopathic Doctors in Bangladesh",
        description: "Find and book appointments with the most experienced homeopathic doctors across Bangladesh. Natural healing through holistic treatment.",
        doctorCount: 500,
        hospitalCount: 120,
    },
    dhaka: {
        title: "Best Homeopathic Doctors in Dhaka",
        description: "Connect with top-rated homeopathic practitioners in Dhaka for personalized constitutional treatment and natural healing.",
        doctorCount: 300,
        hospitalCount: 75,
    },
    chittagong: {
        title: "Best Homeopathic Doctors in Chittagong",
        description: "Discover experienced homeopathic doctors in Chittagong offering holistic treatment for chronic and acute conditions.",
        doctorCount: 80,
        hospitalCount: 20,
    },
    sylhet: {
        title: "Best Homeopathic Doctors in Sylhet",
        description: "Book appointments with trusted homeopathic physicians in Sylhet for natural and gentle healing.",
        doctorCount: 45,
        hospitalCount: 12,
    },
    rajshahi: {
        title: "Best Homeopathic Doctors in Rajshahi",
        description: "Find qualified homeopathic doctors in Rajshahi specializing in constitutional and chronic disease treatment.",
        doctorCount: 35,
        hospitalCount: 10,
    },
    khulna: {
        title: "Best Homeopathic Doctors in Khulna",
        description: "Connect with experienced homeopathic practitioners in Khulna for holistic healthcare solutions.",
        doctorCount: 30,
        hospitalCount: 8,
    },
    // Dhaka Areas
    uttara: {
        title: "Best Homeopathic Doctors in Uttara",
        description: "Find top homeopathic doctors in Uttara, Dhaka for natural healing and constitutional treatment.",
        doctorCount: 28,
        hospitalCount: 5,
    },
    dhanmondi: {
        title: "Best Homeopathic Doctors in Dhanmondi",
        description: "Connect with experienced homeopathic practitioners in Dhanmondi for personalized holistic care.",
        doctorCount: 35,
        hospitalCount: 8,
    },
    mohammadpur: {
        title: "Best Homeopathic Doctors in Mohammadpur",
        description: "Book appointments with trusted homeopathic doctors in Mohammadpur for gentle and effective treatment.",
        doctorCount: 22,
        hospitalCount: 4,
    },
    mohakhali: {
        title: "Best Homeopathic Doctors in Mohakhali",
        description: "Find renowned homeopathic specialists in Mohakhali offering comprehensive natural healthcare.",
        doctorCount: 30,
        hospitalCount: 6,
    },
    gulshan: {
        title: "Best Homeopathic Doctors in Gulshan",
        description: "Discover premium homeopathic clinics in Gulshan with highly qualified practitioners.",
        doctorCount: 42,
        hospitalCount: 10,
    },
    banani: {
        title: "Best Homeopathic Doctors in Banani",
        description: "Connect with experienced homeopathic doctors in Banani for holistic health solutions.",
        doctorCount: 26,
        hospitalCount: 5,
    },
    mirpur: {
        title: "Best Homeopathic Doctors in Mirpur",
        description: "Find affordable homeopathic treatment in Mirpur from experienced practitioners.",
        doctorCount: 38,
        hospitalCount: 6,
    },
    bashundhara: {
        title: "Best Homeopathic Doctors in Bashundhara",
        description: "Book appointments with qualified homeopathic doctors in Bashundhara R/A.",
        doctorCount: 20,
        hospitalCount: 3,
    },
    motijheel: {
        title: "Best Homeopathic Doctors in Motijheel",
        description: "Find trusted homeopathic practitioners in Motijheel for natural healing.",
        doctorCount: 18,
        hospitalCount: 4,
    },
    shyamoli: {
        title: "Best Homeopathic Doctors in Shyamoli",
        description: "Connect with experienced homeopathic doctors in Shyamoli for effective treatment.",
        doctorCount: 15,
        hospitalCount: 3,
    },
    tejgaon: {
        title: "Best Homeopathic Doctors in Tejgaon",
        description: "Find skilled homeopathic practitioners in Tejgaon for chronic and acute diseases.",
        doctorCount: 12,
        hospitalCount: 2,
    },
    lalmatia: {
        title: "Best Homeopathic Doctors in Lalmatia",
        description: "Book appointments with top-rated homeopathic doctors in Lalmatia.",
        doctorCount: 16,
        hospitalCount: 3,
    },
};
