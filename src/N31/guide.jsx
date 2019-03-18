import React from "react";
import "./guide.less";

class Guide extends React.Component {
    render() {
        return(
            <div className="n31">
                <div className="guide">
                    <h1> Hướng dẫn chơi </h1>

                    <span>
                    Cho 1 bảng ô số NxN với N chẵn.
                    Bảng trên có định dạng khá đặc biệt.
                    <strong> Những ô tròn trắng sẽ chứa các số lẻ.</strong>
                    <strong> Những ô tròn xám sẽ chứa các số chẵn. </strong>
                    Mỗi hàng và mỗi cột đều chứa tất cả các số <strong>từ 1 đến N. </strong>
                    Nhiệm vụ của bạn là điền các số vào mỗi ô còn trống để tạo được 1 bảng thỏa mãn.
                    </span>

                    <span>
                        Để điền số vào ô nhấp chuột vào ô cần điền rồi gõ số cần điền.
                        Chú ý số được gõ phải thõa mãn là số nguyên dương không được vượt quá N.
                    </span>
                </div>
            </div>
        );
    }
}

export default Guide;