// Define services data to be used throughout the application
export const services = [
  {
    id: "1",
    title: "Health goals",
    description: "Health goals selected by Dr. Vinjamoori for you",
    subtext: "Jacky Jacbo preformed your assessment. Tap on a goal",
    imageSrc: "/images/1.png",
    showArrow: true
  },
  {
    id: "2",
    title: "RoVR Blood Panel",
    description: "Measure silent killers and potential aging markers",
    imageSrc: "/images/2.png",
  },
  {
    id: "3",
    title: "Drawsrvort",
    description: "Draw account",
    imageSrc: "/images/3.png",
  },
  {
    id: "4",
    title: "Food Sensitivity Testing",
    description: "Identify sensitivities to foods and ingrdies",
    imageSrc: "/images/4.png",
  },
  {
    id: "5",
    title: "General consult",
    description: "Get a doctor's advice for a specific problem or medical concern",
    imageSrc: "/images/5.png",
  },
  {
    id: "6",
    title: "Performance consult",
    description: "Improve your athletic performance and recovery",
    imageSrc: "/images/6.png",
    tag: "Consult"
  },
  {
    id: "7",
    title: "DEXA Scan",
    description: "Measure your body fat and muscle mass",
    imageSrc: "/images/7.png",
  },
  {
    id: "8",
    title: "Environmental Toxins",
    description: "Assess harmful chemicals in your body",
    imageSrc: "/images/8.png",
  },
  {
    id: "9",
    title: "PFAS Chemicals",
    description: "Test for per-and poly tuoroalkyl substances",
    imageSrc: "/images/9.png",
  },
  {
    id: "10",
    title: "Full Body MRI",
    description: "Detect issues in organs, soft tissues and more",
    imageSrc: "/images/10.png",
  },
  {
    id: "11",
    title: "Food & Environment Allergy Testing",
    description: "Discover your immune reaction triggers",
    imageSrc: "/images/1.png", // Using image 1 as fallback since we only have 10 images
  }
];

// Subset of services for homepage preview
export const previewServices = services.slice(0, 3); 