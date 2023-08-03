import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, CustomButtonInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AppointmentAddComponent } from './components/appointment-add/appointment-add.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from './services/appointment.service';
import { AppointmentEditComponent } from './components/appointment-edit/appointment-edit.component';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PermissionCheckService } from 'src/app/services/permission-check/permission-check.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  calendarOptions: CalendarOptions;
  calendarButtons?: { [name: string]: CustomButtonInput } | undefined;
  calendarHeaderToolbar: { [name: string]: string } = {
    center: 'title',
    end: 'dayGridMonth,timeGridWeek,timeGridDay',
  };
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;
  constructor(
    private _dialog: MatDialog,
    private _appointmentService: AppointmentService,
    private _toastrService: ToastrService,
    private _authenticationService: AuthenticationService,
    private _permissionCheckService: PermissionCheckService
  ) {
    if (this.checkPermission('--addappointment')) {
      this.calendarButtons = {
        newAppointment: {
          text: 'Nueva Cita',
          click: () => this.onCreate(),
        },
      };
      this.calendarHeaderToolbar['start'] = 'prev,next today newAppointment';
    } else {
      this.calendarButtons = undefined;
      this.calendarHeaderToolbar['start'] = 'prev,next today';
    }

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      firstDay: 1,
      dayMaxEvents: true,
      eventDurationEditable: false,
      editable: this.checkPermission('--changeappointment') ? true : false,
      locale: 'es',
      timeZone: 'America/El_Salvador',
      customButtons: this.calendarButtons,
      headerToolbar: this.calendarHeaderToolbar,
      buttonText: {
        today: 'Hoy',
        month: 'mes',
        week: 'semana',
        day: 'dia',
      },
      views: {
        timeGridWeek: {
          slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
          },
        },
        timeGridDay: {
          slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
          },
        },
      },
      datesSet: (arg) => {
        this.loadAppointments(arg);
      },
      eventContent: (arg) => this.customEventContent(arg),
      eventDrop: (arg) =>
        this.checkPermission('--changeappointment')
          ? this.onUpdate(arg)
          : undefined,
      eventClick: (arg) => this.appointmentPopup(arg),
    };
  }

  loadAppointments(arg: any) {
    this._appointmentService
      .getAppointments(arg.startStr, arg.endStr)
      .subscribe({
        next: (response: any) => {
          this.calendarOptions.events = response.map((event: any) => {
            return {
              id: event.id,
              title: event.eventTitle,
              start: event.startDate,
              end: event.endDate,
              backgroundColor: '#142028',
              textColor: '#6fd6f6',
              extendedProps: {
                appointmentId: event.id,
                treatmentPlan: event.treatmentPlan,
                medicalRecordNumber: event.medicalRecordNumber,
                description: event.description,
                doctor: event.doctor,
                patient: event.patient,
              },
            };
          });
        },
      });
  }

  onCreate() {
    const addDialogReference = this._dialog.open(AppointmentAddComponent, {
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '500ms',
      width: '100%',
    });
    addDialogReference.afterClosed().subscribe({
      next: (response: any) => {
        if (response) {
          const calendarAPI = this.calendarComponent.getApi();
          calendarAPI.addEvent({
            id: response.id,
            title: response.eventTitle,
            start: response.startDate,
            end: response.endDate,
            backgroundColor: '#142028',
            textColor: '#6fd6f6',
            extendedProps: {
              appointmentId: response.id,
              treatmentPlan: response.treatmentPlan,
              medicalRecordNumber: response.medicalRecordNumber,
              description: response.description,
              doctor: response.doctor,
              patient: response.patient,
            },
          });
        }
      },
    });
  }

  onUpdate(arg: any) {
    let { start: newStart, end: newEnd } = arg.event._instance.range;
    let { start: oldStart, end: oldEnd } = arg.oldEvent._instance.range;
    let { formattedStart, formattedEnd } = this.dateFormatter(newStart, newEnd);
    const appointmentId = arg.event.extendedProps['appointmentId'];
    const payload = {
      startDate: formattedStart,
      endDate: formattedEnd,
    };
    this._appointmentService.patch(appointmentId, payload).subscribe({
      next: () => {
        this._toastrService.success('Cita modificada con éxito');
      },
      error: (error) => {
        let { formattedStart, formattedEnd } = this.dateFormatter(
          oldStart,
          oldEnd
        );
        const calendarAPI = this.calendarComponent.getApi();
        calendarAPI.getEventById(appointmentId)?.setStart(formattedStart);
        calendarAPI.getEventById(appointmentId)?.setEnd(formattedEnd);
        const errorData = this._authenticationService.snakeToCamel(error.error);
        if ('error' in errorData) this._toastrService.error(errorData.error);
        if (errorData.duration !== '' && 'duration' in errorData)
          this._toastrService.error(errorData.duration);
        if (errorData.outOfBusiness !== '' && 'outOfBusiness' in errorData)
          this._toastrService.error(errorData.outOfBusiness);
        if (errorData.wrapLunchTime !== '' && 'wrapLunchTime' in errorData)
          this._toastrService.error(errorData.wrapLunchTime);
        if (errorData.lunchTimeCross !== '' && 'lunchTimeCross' in errorData)
          this._toastrService.error(errorData.lunchTimeCross);
        if (errorData.sameDay !== '' && 'sameDay' in errorData)
          this._toastrService.error(errorData.sameDay);
      },
    });
  }

  appointmentPopup(arg: any) {
    const calendarAPI = this.calendarComponent.getApi();
    const { start, end } = arg.el.fcSeg.eventRange.instance.range;
    const { formattedStart, formattedEnd } = this.dateFormatter(start, end);
    const eventProps: any = arg.event.extendedProps;
    const eventData: any = { start: formattedStart, end: formattedEnd };
    for (const eventProp in eventProps) {
      eventData[eventProp] = eventProps[eventProp];
    }
    const addDialogReference = this._dialog.open(AppointmentEditComponent, {
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '500ms',
      width: '100%',
      data: eventData,
    });

    addDialogReference.afterClosed().subscribe({
      next: (response: any) => {
        if (response !== '') {
          if (response.deleted) {
            calendarAPI.getEventById(response.data.id)?.remove();
          } else {
            calendarAPI
              .getEventById(response.data.id)
              ?.setStart(response.data.startDate);
            calendarAPI
              .getEventById(response.data.id)
              ?.setExtendedProp('description', response.data.description);
            calendarAPI
              .getEventById(response.data.id)
              ?.setExtendedProp('doctor', response.data.doctor);
            calendarAPI
              .getEventById(response.data.id)
              ?.setExtendedProp('treatmentPlan', response.data.treatmentPlan);

            calendarAPI
              .getEventById(response.data.id)
              ?.setEnd(response.data.endDate);
          }
        }
      },
    });
  }

  customEventContent(arg: any) {
    return {
      html: `
      <div class="custom-event" style="background-color: ${
        arg.event.backgroundColor
      }; color: ${
        arg.event.textColor
      }; width:100%;display:flex;text-wrap: nowrap;overflow: hidden;height: 100%;align-items: center;">
        <span class="${
          arg.view.type === 'timeGridDay' ? '' : 'event-text'
        }" style="margin-left:0.2em">● ${arg.timeText} ${arg.event.title}</span>
      </div>`,
    };
  }

  dateFormatter(start: Date, end: Date) {
    const month = start.getMonth() + 1;
    const day = start.getDate();
    const startMonth = month < 10 ? `0${month}` : `${month}`;
    const startDay = day < 10 ? `0${day}` : `${day}`;
    const startHour =
      start.getUTCHours() < 10
        ? `0${start.getUTCHours()}`
        : `${start.getUTCHours()}`;
    const startMinute =
      start.getMinutes() < 10
        ? `0${start.getMinutes()}`
        : `${start.getMinutes()}`;
    const endHour =
      end.getUTCHours() < 10 ? `0${end.getUTCHours()}` : `${end.getUTCHours()}`;
    const endMinute =
      end.getMinutes() < 10 ? `0${end.getMinutes()}` : `${end.getMinutes()}`;

    const formattedStart = `${start.getFullYear()}-${startMonth}-${startDay} ${startHour}:${startMinute}`;
    const formattedEnd = `${start.getFullYear()}-${startMonth}-${startDay} ${endHour}:${endMinute}`;
    return { formattedStart, formattedEnd };
  }

  checkPermission(permission: string) {
    return this._permissionCheckService.validate(permission);
  }
}
