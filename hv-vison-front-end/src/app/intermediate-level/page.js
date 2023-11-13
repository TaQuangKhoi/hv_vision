import Image from "next/image";

export default function BeginnerPage() {
    return (
        <main>
            <div className="center-middle-screen">
                <div className="image-box" onClick="clickImageBox()">
                    <Image src="" id="image-upload" alt="Ảnh Hảo"/>
                </div>
                <ul>
                    <li>
                        <button className="btn btn-primary" type="submit" id="canny-submit-button">
                            Canny
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-primary" type="submit" id="contours-submit-button">
                            Contours
                        </button>
                    </li>
                </ul>
                <div className="image-box">
                    <Image src="" id="image-preview" alt="Ảnh Hảo"/>
                </div>
            </div>
            <form action="" method="post" encType="multipart/form-data" id="form-file">
                <input hidden="hidden"
                       type="file"
                       name="imageInput"
                       id="imageInput"
                       accept="image/png, image/jpeg, image/jpg"
                />
            </form>
        </main>
    )
}