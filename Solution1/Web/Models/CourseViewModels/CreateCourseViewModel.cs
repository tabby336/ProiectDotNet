﻿
using System.ComponentModel.DataAnnotations;

namespace Web.Models.CourseViewModels
{
    public class CreateCourseViewModel
    {
        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [Required]
        [StringLength(4096)]
        public string Description { get; set; }

        [StringLength(128)]
        public string HashTag { get; set; } = "course";

        [Required]
        [StringLength(1024)]
        public string PhotoUrl { get; set; } = "~/images/courses/defaultCourse.png";

        [StringLength(2048)]
        [Display(Name = "Additional info (link, optional)")]
        [DataType(DataType.Url)]
        public string DataLink { get; set; } = "#";
    }
}
