const multer = require("multer");
const sharp = require("sharp");
const Student = require("../models/studentModel");
const AppError = require("../utils/appError");

const supabaseUrl = "https://qlbruwvurmckjguvvjmp.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "C:/Users/aabid/StudioProjects/khatabook_project/android/assets");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     const extMapping = {
//       jpeg: "jpg",
//       png: "png",
//       gif: "gif",
//       bmp: "bmp",
//     };
//     const correctExt = extMapping[ext] || ext;
//     let random = Math.floor(Math.random() * 9000000) + 1000000;
//     cb(null, `student-${random}-${Date.now()}.${correctExt}`);
//   },
// });

const multerStorage = multer.memoryStorage();
//check user upload the image

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please Upload only images.", 400));
  }
};

//upload image

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadStudentPhoto = upload.single("photo");

exports.getStudent = async (req, res, next) => {
  const { accountId } = req.params;
  const account_id = accountId.split("=")[1];
  console.log(account_id);
  const students = await Student.find({
    account_id,
  });

  if (!students) {
    console.log("Hello");
    res.status(404).json({
      status: "error",
      message: "No user to this account",
    });
  }

  res.status(200).json({
    status: "success",
    message: "User founded",
    length: students.length,
    data: students,
  });
};

exports.updateMe = async (req, res, next) => {
  // ! get the photo
  let photo;
  console.log(req.file);
  if (req.file) photo = req.file.filename;

  const { studentId } = req.params;
  const _id = studentId.split("=")[1];

  //@ update the user
  const updateData = await Student.findByIdAndUpdate(
    _id,
    {
      student_name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      imagePath: photo,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updateData) {
    res.status(404).json({
      status: "error",
      message: "Error while modifing the data",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Data Modified",
    data: updateData,
  });
};

// exports.updateMe = async (req, res, next) => {
//   try {
//     let photoUrl = null;
//     if (req.file) {
//       const { data, error } = await supabase.storage
//         .from("khatabook")
//         .upload(`public/student-${Date.now()}.jpg`, req.file.buffer, {
//           cacheControl: "3600",
//           upsert: false,
//           contentType: req.file.mimetype,
//         });

//       if (error) throw error;

//       photoUrl = `${supabaseUrl}/storage/v1/object/public/khatabook/${data.path}`;
//     }

//     const { studentId } = req.params;
//     const _id = studentId.split("=")[1];

//     const updateData = await Student.findByIdAndUpdate(
//       _id,
//       {
//         student_name: req.body.name,
//         phone: req.body.phone,
//         address: req.body.address,
//         imagePath: photoUrl,
//       },
//       {
//         runValidators: true,
//         new: true,
//       }
//     );

//     if (!updateData) {
//       return res.status(404).json({
//         status: "error",
//         message: "Error while modifying the data",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Data Modified",
//       data: updateData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.createStudent = async (req, res, next) => {
  const student = await Student.create(req.body);

  if (!student) {
    return res.status(404).json({
      status: "error",
      message: "Error while creating student",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Student Created",
    data: student,
  });
};

exports.getSingleStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const _id = studentId.split("=")[1];

  const student = await Student.find({
    _id: _id,
  });

  if (!student) {
    return res.status(404).json({
      status: "error",
      message: "Error while Finding student",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Data Found",
    data: student,
  });
};

exports.updateAmount = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const id = studentId.split("=")[1];

    const updateData = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateData);
    if (!updateData) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Updated the transaction",
      data: updateData,
    });
  } catch (err) {
    console.log(err);
  }
};
