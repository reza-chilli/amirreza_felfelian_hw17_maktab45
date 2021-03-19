function addNewEmployee() {
  let f_name = $("#addEmployeeFirstName").val();
  let l_name = $("#addEmployeeLastName").val();
  let company = $("#addEmployeeCompanyId").val();
  let nationalCode = $("#addEmployeeNationalCode").val();
  let gender = $("input[type='radio'][name='gender']:checked").val();
  let ceo = $("input[type='radio'][name='ceo']:checked").val();
  let birthDate = $("#addEmployeeBirthDate").val();
  $.ajax({
    url: "/employee/employees/addNewEmployee",
    type: "POST",
    data:{f_name,l_name,company,nationalCode,gender,ceo,birthDate},
    success: function (result) {
      window.location.href = '/employee/employees'
    },
    error: function (xhr,status,error) {
      setTimeout(function(){window.location.href = '/employee/employees'; }, 3000);
      if (error === "Not Found") {
        alert("inputs are invalid")
      }
    }
  });
}
$("#deleteAll").on('click', function() {
  $.ajax({
    url: "/employee/employees/deleteAll",
    type: "GET",
    success: function (result) {
      window.location.href = '/employee/employees'
    }
  });
})
function deleteEmployee(e) {
  $.ajax({
    url: `/employee/employees/deleteEmployee${e.id}`,
    type: "GET",
    success: function (result) {
      window.location.href = '/employee/employees'
    }
  });
}

function editEmployee(e) {
  $.ajax({
    url: `/employee/employees/findEmployee${e.id.slice(4,)}`,
    type: "GET",
    success: function (result) {
      $("#newEmployeeFirstName").val(result[0].f_name);
      $("#newEmployeeLastName").val(result[0].l_name);
      $("#newEmployeeCompany").val(result[0].company);
      $("#newEmployeeNationalCode").val(result[0].nationalCode);
      $("#newEmployeeBirthDate").val(result[0].birthDate);
      if (result.ceo) {
        $("#is-ceo-true").prop("checked", true)
      } else {
        $("#is-ceo-false").prop("checked", true)
      }
    }
  });
  localStorage.setItem("editID", e.id.slice(4,));
}

function editMyEmployee() {
  let f_name = $("#newEmployeeFirstName").val();
  let l_name = $("#newEmployeeLastName").val();
  let company = $("#newEmployeeCompany").val();
  let nationalCode = $("#newEmployeeNationalCode").val();
  let ceo = $("input[type='radio'][name='is-ceo']:checked").val();
  let birthDate = $("#newEmployeeBirthDate").val();
  $.ajax({
    url: `/employee/employees/editEmployee${localStorage.getItem("editID")}`,
    type: "POST",
    data:{f_name, l_name, company, nationalCode, ceo, birthDate},
    success: function (result) {
      window.location.href = '/employee/employees';
    },
    error: function(xhr, status, error) {
      setTimeout(function(){window.location.href = '/employee/employees'; }, 2000);
      if (error === "Not Found") {
        alert("inputs are invalid")
      }
    }
  });
}