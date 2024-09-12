import multer from "multer";
import { extname, dirname, join } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(_dirname, "..", "temp"));
    // cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
export default upload;
